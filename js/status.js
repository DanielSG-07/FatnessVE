// Function to check if the store is open
export function isStoreOpen() {
    const now = new Date();
    // Get hours in UTC
    const utcHours = now.getUTCHours();
    // Venezuela is UTC-4
    let vetHours = utcHours - 4;

    // Adjust for crossing midnight into the previous day
    if (vetHours < 0) {
        vetHours += 24;
    }

    // Schedule: Monday to Sunday from 5:00 PM (17) to 11:59 PM (23:59)
    const isOpen = vetHours >= 17 && vetHours < 24;
    return isOpen;
}

// Function to update the status indicator and text
function updateStatusIndicator() {
    const statusIndicator = document.getElementById('status-indicator');
    const statusText = document.getElementById('status-text');

    if (statusIndicator && statusText) {
        if (isStoreOpen()) {
            statusIndicator.classList.remove('status-closed');
            statusIndicator.classList.add('status-open');
            statusText.textContent = 'Local Abierto';
        } else {
            statusIndicator.classList.remove('status-open');
            statusIndicator.classList.add('status-closed');
            statusText.textContent = 'Local Cerrado';
        }
    }
}

// Function to initialize the status checking
export function initializeStatus() {
    updateStatusIndicator();
    setInterval(updateStatusIndicator, 60000); // Update every minute
}