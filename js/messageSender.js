import { getCart, clearCart } from './cart.js';

// Function to fetch BCV rate
async function getBCVRate() {
    try {
        // Using dolarapi.com - Venezuelan official rate
        const response = await fetch('https://ve.dolarapi.com/v1/dolares/oficial');

        if (!response.ok) {
            console.error("API returned status:", response.status);
            return null;
        }

        const data = await response.json();
        console.log("DolarAPI Response:", data);

        // Extract the 'promedio' field
        if (data && data.promedio) {
            console.log("Found promedio rate:", data.promedio);
            return data.promedio;
        }

        console.error("Could not find promedio in response structure:", data);
        return null;
    } catch (error) {
        console.error("Error fetching BCV rate:", error);
        return null;
    }
}

export async function sendWhatsAppMessage(option, paymentMethod) {
    const user = JSON.parse(localStorage.getItem('user'));
    const userName = user ? user.name : 'Cliente';

    // If no payment method is passed, default to 'Consultar'
    const paymentText = paymentMethod ? paymentMethod : 'Consultar';

    let message = `¡Hola! Soy ${userName} y quiero hacer un pedido para ${option}.\n`;
    message += `Metodo de Pago: ${paymentText}\n\n`;

    // Fetch rate if needed (only for BCV calculation)
    let bcvRate = 0;
    if (paymentMethod === "$ BCV") {
        bcvRate = await getBCVRate();

        if (!bcvRate) {
            alert("No se pudo obtener la tasa del BCV actual. Por favor verifica tu conexión o intenta más tarde.");
            return;
        }

        message += `Tasa BCV: ${bcvRate.toFixed(2)} Bs/$\n\n`;
    } else if (paymentMethod === "$ USD") {
        // For USD Cash, we use the fixed rate from prices.js (1 USD = 3700 COP)
        const usdRate = typeof COP_PER_USD !== 'undefined' ? COP_PER_USD : 3700;
        message += `Tasa USD Efectivo: ${usdRate.toLocaleString('es-CO')} COP/$\n\n`;
    }

    let totalCOP = 0;
    let totalBCV = 0;

    getCart().forEach(cartItem => {
        const item = cartItem.item;
        const quantity = cartItem.quantity;

        // Item price should be in COP now
        const itemTotal = item.price * quantity;
        totalCOP += itemTotal;

        const papasFrancesasItems = ["CLÁSICAS", "CHEDDAR", "SALCHICHA", "SALCHICHA Y CHEDDAR", "GRINGAS", "POLLO Y CHEDDAR", "FATNESS (3-4 PERSONAS)", "½ FATNESS (1-2 PERSONAS)"];
        let title = item.title;
        let tipoText = '';
        if (papasFrancesasItems.includes(item.title)) {
            title = "Papas Francesas";
            tipoText = `- Tipo: ${item.title}\n`;
        }

        // Helper for display price based on Payment Method
        let displayPrice = "";

        if (paymentMethod === "COP") {
            displayPrice = `${itemTotal.toLocaleString('es-CO')} COP`;
        } else if (paymentMethod === "$ BCV") {
            // BCV Logic:
            // 1. Convert COP to "Dollars" using the legacy factor (2090)
            const amountInDollars = itemTotal / (typeof COP_PER_BCV !== 'undefined' ? COP_PER_BCV : 2090);

            // 2. Convert "Dollars" to Bs using the fetched BCV Rate
            const amountInBs = amountInDollars * bcvRate;

            totalBCV += amountInBs;

            const roundedAmount = typeof roundPrice === 'function' ? roundPrice(amountInBs) : amountInBs;
            displayPrice = `Bs ${roundedAmount.toFixed(2)}`;
        } else if (paymentMethod === "$ USD") {
            // USD Cash Logic:
            // Convert COP to USD using the fixed rate (1 USD = 3700 COP)
            const amountInUSD = itemTotal / (typeof COP_PER_USD !== 'undefined' ? COP_PER_USD : 3700);

            totalBCV += amountInUSD; // Reuse totalBCV variable for USD total

            const roundedAmount = typeof roundPrice === 'function' ? roundPrice(amountInUSD) : amountInUSD;
            displayPrice = `$ ${roundedAmount.toFixed(2)}`;
        }

        message += `*${title}* (x${quantity})\n`;
        message += tipoText;
        if (item.sabor) message += `- Sabor: ${item.sabor}\n`;
        if (item.brand) message += `- Marca: ${item.brand}\n`;
        if (item.presentation) message += `- Presentación: ${item.presentation}\n`;
        if (item.customizations && item.customizations.length > 0) {
            message += `- Adicionales: ${item.customizations.join(', ')}\n`;
        }
        message += `Precio: ${displayPrice}\n\n`;
    });

    // Total display based on Payment Method
    if (paymentMethod === "COP") {
        const formattedCOP = totalCOP.toLocaleString('es-CO');
        message += `*Total del Pedido: ${formattedCOP} COP*\n`;
    } else if (paymentMethod === "$ BCV") {
        const roundedTotal = typeof roundPrice === 'function' ? roundPrice(totalBCV) : totalBCV;
        message += `*Total del Pedido: Bs ${roundedTotal.toFixed(2)}*\n`;
    } else if (paymentMethod === "$ USD") {
        const roundedTotal = typeof roundPrice === 'function' ? roundPrice(totalBCV) : totalBCV;
        message += `*Total del Pedido: $ ${roundedTotal.toFixed(2)}*\n`;
    }

    const whatsappUrl = `https://wa.me/584247818441?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    // Clear the cart after sending the message
    clearCart();
}
