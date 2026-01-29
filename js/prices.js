// Base prices for the menu items
// IMPORTANT: All prices in priceList are in COP (Colombian Pesos)
const BASE_CURRENCY = "COP";
const DISPLAY_CURRENCY = "$";

// Exchange rate: How many COP equal 1 BCV?
// This rate is used ONLY for display conversion (COP -> BCV for showing prices)
const COP_PER_BCV = 2090;

// Exchange rate for USD Cash: 1 USD = 3600 COP
// This rate is used for:
// 1. Converting extras from MenuData.js (which are in USD Cash) to COP
// 2. Converting final prices to USD Cash for payment method "$ USD"
const COP_PER_USD = 3600;


const priceList = {
    // Entradas
    "Tequeños": 12000,
    "Brownie": 15000,

    // Hamburguesas
    "CHESSE BURGUER": 24000,
    "MECHADA BURGUER": 26000,
    "MOMMY BURGUER": 29000,
    "CRISPY BURGER": 32000,
    "PIG BURGUER": 32000,
    "RANCHERA PICANTE": 34000,
    "SMASH BURGER": 30000,
    "FITNESS BURGUER": 29000,
    "BYE GYM": 48000,

    // Papas Francesas
    "CLÁSICAS": 20000,
    "CHEDDAR": 24000,
    "SALCHICHA": 24000,
    "SALCHICHA Y CHEDDAR": 28000,
    "GRINGAS": 30000,
    "POLLO Y CHEDDAR": 30000,
    "FATNESS (3-4 PERSONAS)": 88000,
    "½ FATNESS (1-2 PERSONAS)": 53000,

    // Perros Calientes
    "VIENA": 20000,
    "CHORIFRITO": 21000,
    "ALEMANA": 21000,
    "ANTIOQUEÑO": 24000,
    "KOSACA": 24000,
    "SELVA NEGRA": 28000,
    "POLACA": 28000,
    "BAVARIA": 28000,
    "FATNESS": 32000,

    // Kids
    "TENDERS DE POLLO": 19000,
    "MINI BURGERS": 17000,
    "MINI HOT DOGS": 16000,

    // Otros Platos
    "PIGGY": 32000,
    "SUCULENTO": 32000,

    // Bebidas
    "Vodka Breeze Ice": 3600,
    "Cerveza": 2000,
    "Refresco": 4000,
    "Nestea": 8000,
    "Bebidas Naturales": 8000,
    "Merengadas": 15000,
    "Frappe": 10000,
    "Limonada de Coco": 12000,
    "Toddy": 15000,

    // Shots
    "TEQUILA": 9000,
    "SUBMARINO": 9000,
    "LAYERS": 9000,

    // Cocteles
    "Gin Tonic Frutos Rojos": 16000,
    "Mojito Clasico o Kiwi": 14000,
    "Daiquirí Mango o Fresa": 16000,
    "Piña Colada": 16000,
    "Blue Margarita": 14000,
    "Sangria con Frutas": 16000,
    "Polvo de Medianoche": 14000,
    "Chelada Maracuya": 12000,
    "Cuba Libre": 10000,
    "Sneyk Pen": 18000,
    "Delta Sunset": 14000
};

// Helper function to convert and format price
// Rounds to 2 decimal places
function roundPrice(value) {
    return Math.ceil(value * 10) / 10;
}

function formatCurrency(amountInCop) {
    const amountInBcv = amountInCop / COP_PER_BCV;
    const roundedAmount = roundPrice(amountInBcv);
    return `${DISPLAY_CURRENCY} ${roundedAmount.toFixed(2)}`;
}

// Expose to window for global access (important for module scripts)
if (typeof window !== 'undefined') {
    window.priceList = priceList;
    window.BASE_CURRENCY = BASE_CURRENCY;
    window.DISPLAY_CURRENCY = DISPLAY_CURRENCY;
    window.COP_PER_BCV = COP_PER_BCV;
    window.COP_PER_USD = COP_PER_USD;
    window.formatCurrency = formatCurrency;
    window.roundPrice = roundPrice;
}

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { priceList, BASE_CURRENCY, DISPLAY_CURRENCY, COP_PER_BCV, formatCurrency, roundPrice };
}
