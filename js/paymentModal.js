import { sendWhatsAppMessage } from './messageSender.js';

const paymentModal = document.getElementById('payment-modal');
const closePaymentModalBtn = paymentModal ? paymentModal.querySelector('.close-modal') : null;
const paymentOptions = document.querySelectorAll('.payment-option-btn');
const backToDeliveryBtn = document.getElementById('back-to-delivery');

let selectedDeliveryOption = null;

// Open Payment Modal
export function openPaymentModal(deliveryOption) {
    selectedDeliveryOption = deliveryOption;
    if (paymentModal) {
        paymentModal.style.display = 'flex';
    } else {
        console.error("Payment modal element not found!");
        // Fallback: skip payment selection
        sendWhatsAppMessage(deliveryOption, "No especificado");
    }
}

// Close Payment Modal
function closePaymentModal() {
    if (paymentModal) {
        paymentModal.style.display = 'none';
    }
}

// Event Listeners
if (paymentOptions) {
    paymentOptions.forEach(btn => {
        btn.addEventListener('click', () => {
            const paymentMethod = btn.dataset.method; // 'COP' or 'BCV'
            console.log(`Payment method selected: ${paymentMethod}`);

            // Send message with Delivery Option AND Payment Method
            sendWhatsAppMessage(selectedDeliveryOption, paymentMethod);

            // Close modals manually
            closePaymentModal();
            const deliveryModal = document.getElementById('delivery-modal');
            if (deliveryModal) deliveryModal.style.display = 'none';
        });
    });
}

if (closePaymentModalBtn) {
    closePaymentModalBtn.addEventListener('click', closePaymentModal);
}

if (backToDeliveryBtn) {
    backToDeliveryBtn.addEventListener('click', () => {
        closePaymentModal();
        // Ideally reopen delivery modal, but it might still be open underneath or we need to reopen it
        // Depending on z-index or flow.
        // For now just close payment.
        // Use global openDeliveryModal if accessible? 
        // Import circular dependency might run into issues.
        // Assuming user can just click "Checkout" again.
    });
}

window.addEventListener('click', (e) => {
    if (e.target === paymentModal) {
        closePaymentModal();
    }
});
