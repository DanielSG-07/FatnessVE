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

    // Global constants from prices.js
    const rateCOP_BCV = typeof COP_PER_BCV !== 'undefined' ? COP_PER_BCV : 2090;
    const rateCOP_USD = typeof COP_PER_USD !== 'undefined' ? COP_PER_USD : 3700;

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
        // For USD Cash, we use the fixed rate from prices.js
        message += `Tasa USD Efectivo: ${rateCOP_USD.toLocaleString('es-CO')} COP/$\n\n`;
    }

    let totalCOP = 0;
    let totalBCV = 0;
    let totalUSD = 0;

    getCart().forEach(cartItem => {
        const item = cartItem.item;
        const quantity = cartItem.quantity;
        const basePriceCop = item.basePriceCop || item.price;
        const extrasUSD = item.extrasUsd || 0;

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
            // Formula: (Base + (Extras * COP_PER_USD)) * Quantity
            const itemTotalCOP = (basePriceCop + (extrasUSD * rateCOP_USD)) * quantity;
            totalCOP += itemTotalCOP;
            displayPrice = `${itemTotalCOP.toLocaleString('es-CO')} COP`;
        } else if (paymentMethod === "$ BCV") {
            // Formula: ((Base / COP_PER_BCV) + Extras) * Quantity * bcvRate
            const itemUnitsBCV = (basePriceCop / rateCOP_BCV) + extrasUSD;
            const itemTotalBs = itemUnitsBCV * quantity * bcvRate;
            totalBCV += itemTotalBs;

            const roundedAmount = typeof roundPrice === 'function' ? roundPrice(itemTotalBs) : itemTotalBs;
            displayPrice = `Bs ${roundedAmount.toFixed(2)}`;
        } else if (paymentMethod === "$ USD") {
            // Formula: ((Base / COP_PER_USD) + Extras) * Quantity
            const itemTotalUSD = ((basePriceCop / rateCOP_USD) + extrasUSD) * quantity;
            totalUSD += itemTotalUSD;

            const roundedAmount = typeof roundPrice === 'function' ? roundPrice(itemTotalUSD) : itemTotalUSD;
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
        const roundedTotal = typeof roundPrice === 'function' ? roundPrice(totalUSD) : totalUSD;
        message += `*Total del Pedido: $ ${roundedTotal.toFixed(2)}*\n`;
    }

    const whatsappUrl = `https://wa.me/584247818441?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    // Clear the cart after sending the message
    clearCart();
}
