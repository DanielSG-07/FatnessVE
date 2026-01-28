import { getCart, clearCart } from './cart.js';
import { showNotification } from './notifications.js';
import { openPaymentModal } from './paymentModal.js';

const deliveryModal = document.getElementById('delivery-modal');
const closeModalButton = deliveryModal.querySelector('.close-modal');
const deliveryOptions = deliveryModal.querySelectorAll('.delivery-option-btn');

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

// Event listeners for delivery option buttons
deliveryOptions.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.classList.contains('disabled')) {
            showNotification("Los articulos seleccionados NO estan disponibles para este metodo de entrega");
            return;
        }
        const option = btn.querySelector('p').textContent;

        console.log("Opening Payment Modal for option:", option);
        // Instead of sending message directly, open Payment Modal
        openPaymentModal(option);
    });
});

// Checkout Button Logic (Moved from cart.js)
const checkoutBtn = document.getElementById('checkout-btn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        console.log("Checkout button clicked");
        const cart = getCart(); // Use imported getCart
        if (cart.length === 0) {
            alert('El carrito está vacío. Agrega algunos productos antes de enviar el pedido.');
            return;
        }

        // Check if user is logged in
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            alert('Debes iniciar sesión antes de enviar un pedido.');
            // Open login modal
            const loginModal = document.getElementById('login-modal');
            if (loginModal) {
                loginModal.style.display = 'flex';
            }
            return;
        }

        openDeliveryModal();
    });
}

// Event listener for the close button
closeModalButton.addEventListener('click', closeDeliveryModal);
const backToCartBtn = document.getElementById('back-to-cart');
if (backToCartBtn) {
    backToCartBtn.addEventListener('click', closeDeliveryModal);
}

// Close the modal if the user clicks outside of it
window.addEventListener('click', (event) => {
    if (event.target === deliveryModal) {
        closeDeliveryModal();
    }
});