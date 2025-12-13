
const deliveryModal = document.getElementById('delivery-modal');
const closeModalButton = deliveryModal.querySelector('.close-modal');
const deliveryOptions = document.querySelectorAll('.delivery-option-btn');

const cocktailNames = [
    "Gin Tonic Frutos Rojos", "Mojito Clasico o Kiwi", "Daiquirí Mango o Fresa",
    "Piña Colada", "Blue Margarita", "Sangria con Frutas", "Polvo de Medianoche",
    "Chelada Maracuya", "Cuba Libre", "Sneyk Pen", "Delta Sunset","Cerveza",
    "Bebidas Naturales","Merengadas","Frappe","Limonada de Coco","Toddy","Nestea"
];

function isCocktail(itemName) {
    return cocktailNames.includes(itemName);
}

// Function to open the delivery modal
export function openDeliveryModal() {
    const hasCocktail = window.cart.some(cartItem => isCocktail(cartItem.item.title));

    deliveryOptions.forEach(btn => {
        const option = btn.querySelector('p').textContent.trim();
        if (hasCocktail && (option === 'Delivery' || option === 'Recoger')) {
            btn.disabled = true;
            btn.classList.add('disabled');
            btn.title = 'No disponible para LLevar o Delivery';
        } else {
            btn.disabled = false;
            btn.classList.remove('disabled');
            btn.title = '';
        }
    });

    deliveryModal.style.display = 'flex';
}

// Function to close the delivery modal
export function closeDeliveryModal() {
    deliveryModal.style.display = 'none';
}

// Function to send WhatsApp message
function sendWhatsAppMessage(option) {
    const user = JSON.parse(localStorage.getItem('user'));
    const userName = user ? user.name : 'Cliente';

    let message = `¡Hola! Soy ${userName} y quiero hacer un pedido para ${option}:\n\n`;
    let total = 0;

    window.cart.forEach(cartItem => {
        const item = cartItem.item;
        const quantity = cartItem.quantity;
        const itemTotal = item.price * quantity;
        total += itemTotal;

        const papasFrancesasItems = ["CLÁSICAS", "CHEDDAR", "SALCHICHA", "SALCHICHA Y CHEDDAR", "GRINGAS", "POLLO Y CHEDDAR", "FATNESS (3-4 PERSONAS)", "½ FATNESS (1-2 PERSONAS)"];
        let title = item.title;
        let tipoText = '';

        if (papasFrancesasItems.includes(item.title)) {
            title = "Papas Francesas";
            tipoText = `- Tipo: ${item.title}\n`;
        }

        message += `*${title}* (x${quantity})\n`;
        message += tipoText;
        if (item.sabor) message += `- Sabor: ${item.sabor}\n`;
        if (item.brand) message += `- Marca: ${item.brand}\n`;
        if (item.presentation) message += `- Presentación: ${item.presentation}\n`;
        if (item.customizations && item.customizations.length > 0) {
            message += `- Adicionales: ${item.customizations.join(', ')}\n`;
        }
        message += `Precio: $${itemTotal.toFixed(2)}\n\n`;
    });

    message += `*Total del Pedido: $${total.toFixed(2)}*`;

    const whatsappUrl = `https://wa.me/584247818441?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    closeDeliveryModal();
}

// Event listeners for delivery option buttons
deliveryOptions.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.disabled) {
            return; // Do nothing if the button is disabled
        }
        const option = btn.querySelector('p').textContent;
        sendWhatsAppMessage(option);
    });
});


// Event listener for the close button
closeModalButton.addEventListener('click', closeDeliveryModal);

// Close the modal if the user clicks outside of it
window.addEventListener('click', (event) => {
    if (event.target === deliveryModal) {
        closeDeliveryModal();
    }
});
