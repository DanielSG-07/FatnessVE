export function showNotification(message) {
    let notification = document.querySelector('.custom-notification');
    if (notification) {
        clearTimeout(window.notificationTimeout);
        notification.remove();
    }

    notification = document.createElement('div');
    notification.className = 'custom-notification';
    notification.textContent = message;

    document.body.appendChild(notification);

    window.notificationTimeout = setTimeout(() => {
        if (notification && document.body.contains(notification)) {
            document.body.removeChild(notification);
        }
    }, 2000); // 2 seconds, as 1 second is a bit fast
}
