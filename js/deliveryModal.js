import { getCart, clearCart } from './cart.js';
import { showNotification } from './notifications.js';

const deliveryModal = document.getElementById('delivery-modal');
const closeModalButton = deliveryModal.querySelector('.close-modal');
const deliveryOptions = document.querySelectorAll('.delivery-option-btn');

// Function to get available delivery types for an item
export function getAvailableDeliveryTypes(itemName) {
    const item = menuData.items[itemName];
    if (item && item.delivery) {
        return item.delivery;
    }
    // If delivery property is not defined, all options are available
    return ["delivery", "pickup", "eat-in"];
}

// Function to open the delivery modal
export function openDeliveryModal() {
    const cartItems = getCart();
    let allAvailableTypes = ["delivery", "pickup", "eat-in"];

    // Intersect the available delivery types for all items in the cart
    cartItems.forEach(cartItem => {
        const itemDeliveryTypes = getAvailableDeliveryTypes(cartItem.item.title);
        allAvailableTypes = allAvailableTypes.filter(type => itemDeliveryTypes.includes(type));
    });

    deliveryOptions.forEach(btn => {
        const option = btn.dataset.option;
        if (allAvailableTypes.includes(option)) {
            btn.classList.remove('disabled');
        } else {
            btn.classList.add('disabled');
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

    getCart().forEach(cartItem => {
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
    
    // Clear the cart after sending the message
    clearCart();
    
    closeDeliveryModal();
}

// Event listeners for delivery option buttons
deliveryOptions.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.classList.contains('disabled')) {
            showNotification("No se puede Solicitar el Envio Porque tiene un Elemento que no puede ser Enviado");
            return;
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