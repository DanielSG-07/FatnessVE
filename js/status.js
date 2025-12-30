document.addEventListener('DOMContentLoaded', function() {
    const statusIndicator = document.getElementById('status-indicator');
    const statusText = document.getElementById('status-text');
    const checkoutBtn = document.getElementById('checkout-btn');

    function updateStatus() {
        const now = new Date();
        const hours = now.getHours();
        
        // Schedule: Monday to Sunday, 6:00 PM (18) to 11:00 PM (23)
        const isOpen = hours >= 17 && hours < 24;

        if (isOpen) {
            statusIndicator.classList.remove('status-closed');
            statusIndicator.classList.add('status-open');
            statusText.textContent = 'Local Abierto';
            if (checkoutBtn) {
                checkoutBtn.disabled = false;
                checkoutBtn.style.cursor = 'pointer';
                checkoutBtn.title = '';
            }
        } else {
            statusIndicator.classList.remove('status-open');
            statusIndicator.classList.add('status-closed');
            statusText.textContent = 'Local Cerrado';
            if (checkoutBtn) {
                checkoutBtn.disabled = true;
                checkoutBtn.style.cursor = 'not-allowed';
                checkoutBtn.title = 'No se pueden realizar pedidos fuera del horario de atención.';
            }
        }
    }

    updateStatus();
    setInterval(updateStatus, 60000); // Update every minute
});