document.addEventListener('DOMContentLoaded', () => {
    updateMenuPrices();
});

function updateMenuPrices() {
    console.log("Updating menu prices...");

    if (typeof priceList === 'undefined') {
        console.error("Price list not found! Make sure prices.js is loaded.");
        return;
    }

    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        const titleElement = item.querySelector('h4');
        const priceElement = item.querySelector('.price');

        if (titleElement && priceElement) {
            const productName = titleElement.textContent.trim();
            const priceCOP = priceList[productName];

            if (priceCOP !== undefined) {
                // Use the global formatCurrency function from prices.js
                // If it doesn't exist (scope issues), fallback to manual calculation
                let displayString = "";
                if (typeof formatCurrency === 'function') {
                    displayString = formatCurrency(priceCOP);
                } else {
                    // Fallback
                    const amountInBcv = priceCOP / 2090;
                    const roundedAmount = typeof roundPrice === 'function' ? roundPrice(amountInBcv) : amountInBcv;
                    displayString = `$ BCV ${roundedAmount.toFixed(2)}`;
                }

                priceElement.textContent = displayString;

                // Store base COP price in data attribute for calculations
                item.setAttribute('data-price-cop', priceCOP);
                // Also keep data-price for compatibility, but store the DISPLAY value number or COP? 
                // Let's store the BCV value for legacy scripts that expect the displayed number
                const amountInBcv = priceCOP / (typeof COP_PER_BCV !== 'undefined' ? COP_PER_BCV : 2090);
                const roundedAmount = typeof roundPrice === 'function' ? roundPrice(amountInBcv) : amountInBcv;
                item.setAttribute('data-price', roundedAmount.toFixed(2));

            } else {
                console.warn(`Price not found for item: "${productName}"`);
            }
        }
    });
}
