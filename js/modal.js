import { getAvailableDeliveryTypes } from './deliveryModal.js';
import { isStoreOpen } from './status.js';

// Modal functionality
const CURRENCY_SYMBOL = "$ BCV";
const modal = document.getElementById('item-modal');
const closeModal = document.querySelector('.close-modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalPrice = document.getElementById('modal-price');
const ingredientSection = document.getElementById('ingredient-section');
const baseList = document.getElementById('base-list');
const optionalList = document.getElementById('optional-list');
const deliveryIcons = document.querySelectorAll('.delivery-icon-container');
const addToCartBtn = document.getElementById('add-to-cart-btn');

let currentItemData = null;

// Open modal on menu item click
console.log("Initializing modal script");
document.querySelectorAll('.menu-item').forEach(item => {
  item.addEventListener('click', () => {
    const imgSrc = item.querySelector('img').src;
    const title = item.querySelector('h4').textContent.trim();
    const description = item.querySelector('p').textContent;
    // Use data-price-cop (COP value) set by priceUpdater.js
    const priceRaw = item.getAttribute('data-price-cop');
    let priceVal = 0;

    if (priceRaw) {
      priceVal = parseFloat(priceRaw);
    } else {
      // Fallback: try to extract number from text or data-price (BCV)
      // If we don't have COP price, we must reverse calculate or accept risk
      const bcvRaw = item.getAttribute('data-price');
      if (bcvRaw) {
        priceVal = parseFloat(bcvRaw) * (typeof COP_PER_BCV !== 'undefined' ? COP_PER_BCV : 2090);
      } else {
        const priceText = item.querySelector('.price').textContent;
        const bcvVal = parseFloat(priceText.replace(/[^\d.]/g, ''));
        priceVal = bcvVal * (typeof COP_PER_BCV !== 'undefined' ? COP_PER_BCV : 2090);
      }
    }

    modalImage.src = imgSrc;
    modalTitle.textContent = title;
    modalDescription.textContent = description;

    // Store numeric base price
    modalPrice.dataset.basePrice = priceVal;

    // Populate ingredients and delivery icons
    populateIngredients(title);
    updateDeliveryIcons(title);

    // Update modal price initially
    updateModalPrice();

    // Enable/disable add to cart button
    if (isStoreOpen()) {
      addToCartBtn.disabled = false;
      addToCartBtn.textContent = 'Agregar al Carrito';
    } else {
      addToCartBtn.disabled = true;
      addToCartBtn.textContent = 'Local Cerrado';
    }

    modal.style.display = 'flex';
  });
});

function updateModalPrice() {
  const basePriceText = modalPrice.dataset.basePrice;
  let basePrice = parseFloat(basePriceText);

  if (isNaN(basePrice)) {
    return;
  }

  let extrasUSD = 0;

  // For radio and checkbox inputs
  optionalList.querySelectorAll('input:checked').forEach(input => {
    const priceVal = parseFloat(input.dataset.price);
    if (!isNaN(priceVal)) {
      extrasUSD += priceVal;
    }
  });

  // For brand buttons
  const selectedBrand = optionalList.querySelector('.brand-button.selected');
  if (selectedBrand) {
    const priceVal = parseFloat(selectedBrand.dataset.price);
    if (!isNaN(priceVal)) {
      extrasUSD += priceVal;
    }
  }

  // Calculate total COP using COP_PER_USD for the extras
  const additionalPriceCOP = extrasUSD * (typeof COP_PER_USD !== 'undefined' ? COP_PER_USD : 3700);
  const totalCOP = basePrice + additionalPriceCOP;

  // For display purposes, we use the formula: (BaseCOP / COP_PER_BCV) + ExtrasUSD
  const baseInBcv = basePrice / (typeof COP_PER_BCV !== 'undefined' ? COP_PER_BCV : 2090);
  const totalInBcv = baseInBcv + extrasUSD;

  const roundedAmount = typeof roundPrice === 'function' ? roundPrice(totalInBcv) : totalInBcv;
  const displayString = `${CURRENCY_SYMBOL} ${roundedAmount.toFixed(2)}`;

  modalPrice.textContent = displayString;
  modalPrice.dataset.currentTotalCop = totalCOP;
  modalPrice.dataset.extrasUsd = extrasUSD;
  modalPrice.dataset.basePriceCop = basePrice;
}

function updateDeliveryIcons(itemTitle) {
  const availableTypes = getAvailableDeliveryTypes(itemTitle);

  deliveryIcons.forEach(iconContainer => {
    const iconType = iconContainer.dataset.type;
    if (availableTypes.includes(iconType)) {
      iconContainer.classList.add('available');
    } else {
      iconContainer.classList.remove('available');
    }
  });
}

// Populate ingredients based on item
function populateIngredients(itemTitle) {
  currentItemData = menuData.items[itemTitle];

  if (!currentItemData) {
    ingredientSection.style.display = 'none';
    return;
  }

  ingredientSection.style.display = 'block';

  // Base ingredients
  baseList.innerHTML = '';
  currentItemData.baseIngredients.forEach(ingredient => {
    const li = document.createElement('li');
    li.textContent = ingredient;
    baseList.appendChild(li);
  });

  // Optional ingredients and choices
  optionalList.innerHTML = '';
  optionalList.addEventListener('change', updateModalPrice);


  // Exclusive choices (e.g., sausage type) rendered as radio buttons
  if (currentItemData.eleccionSalchicha && currentItemData.eleccionSalchicha.length > 0) {
    const title = document.createElement('h5');
    title.textContent = 'Elige la Salchicha';
    optionalList.appendChild(title);

    currentItemData.eleccionSalchicha.forEach((option, index) => {
      const div = document.createElement('div');
      div.className = 'ingredient-option';

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'salchicha-choice'; // Shared name makes them exclusive
      radio.id = `option-${option.name.replace(/\s+/g, '-').toLowerCase()}`;
      radio.dataset.price = option.price || 0;
      if (index === 0) {
        radio.checked = true; // Default to the first option
      }

      const label = document.createElement('label');
      label.htmlFor = radio.id;
      label.textContent = `${option.name}${option.price > 0 ? ` (+$${option.price.toFixed(2)})` : ''}`;

      div.appendChild(radio);
      div.appendChild(label);
      optionalList.appendChild(div);
    });
  }

  // Exclusive choices (e.g., brand type) rendered as buttons
  if (currentItemData.eleccionMarca && currentItemData.eleccionMarca.length > 0) {
    const title = document.createElement('h5');
    title.textContent = 'Elige la Marca';
    optionalList.appendChild(title);

    const brandContainer = document.createElement('div');
    brandContainer.className = 'brand-container';
    optionalList.appendChild(brandContainer);

    currentItemData.eleccionMarca.forEach((option, index) => {
      const brandButton = document.createElement('div');
      brandButton.className = 'brand-button';
      brandButton.textContent = `${option.name}${option.price > 0 ? ` (+$${option.price.toFixed(2)})` : ''}`;
      brandButton.dataset.brand = option.name;
      brandButton.dataset.price = option.price || 0;

      if (index === 0) {
        brandButton.classList.add('selected');
      }

      brandButton.addEventListener('click', () => {
        // Remove selected from all brand buttons
        document.querySelectorAll('.brand-button').forEach(btn => {
          btn.classList.remove('selected');
        });
        // Add selected to the clicked one
        brandButton.classList.add('selected');
        updateModalPrice();
      });

      brandContainer.appendChild(brandButton);
    });
  }

  // Exclusive choices (e.g., size type) rendered as radio buttons
  if (currentItemData.eleccionPresentacion && currentItemData.eleccionPresentacion.length > 0) {
    const title = document.createElement('h5');
    title.textContent = 'Elige la Presentación';
    optionalList.appendChild(title);

    currentItemData.eleccionPresentacion.forEach((option, index) => {
      const div = document.createElement('div');
      div.className = 'ingredient-option';

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'presentacion-choice'; // Shared name makes them exclusive
      radio.id = `option-${option.name.replace(/\s+/g, '-').toLowerCase()}`;
      radio.dataset.price = option.price || 0;
      if (index === 0) {
        radio.checked = true; // Default to the first option
      }

      const label = document.createElement('label');
      label.htmlFor = radio.id;
      label.textContent = `${option.name}${option.price > 0 ? ` (+$${option.price.toFixed(2)})` : ''}`;

      div.appendChild(radio);
      div.appendChild(label);
      optionalList.appendChild(div);
    });
  }

  // Exclusive choices (e.g., flavor type) rendered as radio buttons
  if (currentItemData.eleccionSabor && currentItemData.eleccionSabor.length > 0) {
    const title = document.createElement('h5');
    title.textContent = 'Elige el Sabor';
    optionalList.appendChild(title);

    currentItemData.eleccionSabor.forEach((option, index) => {
      const div = document.createElement('div');
      div.className = 'ingredient-option';

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'sabor-choice'; // Shared name makes them exclusive
      radio.id = `option-${option.name.replace(/\s+/g, '-').toLowerCase()}`;
      radio.dataset.price = option.price || 0;
      if (index === 0) {
        radio.checked = true; // Default to the first option
      }

      const label = document.createElement('label');
      label.htmlFor = radio.id;
      label.textContent = `${option.name}${radio.dataset.price > 0 ? ` (+$${parseFloat(radio.dataset.price).toFixed(2)})` : ''}`;

      div.appendChild(radio);
      div.appendChild(label);
      optionalList.appendChild(div);
    });
  }

  // Exclusive choices (e.g., cheese type) rendered as radio buttons
  if (currentItemData.eleccionQueso && currentItemData.eleccionQueso.length > 0) {
    const title = document.createElement('h5');
    title.textContent = 'Elige el Tipo de Queso';
    optionalList.appendChild(title);

    currentItemData.eleccionQueso.forEach((option, index) => {
      const div = document.createElement('div');
      div.className = 'ingredient-option';

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'queso-choice'; // Shared name makes them exclusive
      radio.id = `option-${option.name.replace(/\s+/g, '-').toLowerCase()}`;
      radio.dataset.price = option.price || 0;
      if (index === 0) {
        radio.checked = true; // Default to the first option
      }

      const label = document.createElement('label');
      label.htmlFor = radio.id;
      label.textContent = `${option.name}${option.price > 0 ? ` (+$${option.price.toFixed(2)})` : ''}`;

      div.appendChild(radio);
      div.appendChild(label);
      optionalList.appendChild(div);
    });
  }

  // Optional add-ons rendered as checkboxes
  if (currentItemData.optionalIngredients && currentItemData.optionalIngredients.length > 0) {
    const title = document.createElement('h5');
    title.textContent = 'Extras Opcionales';
    optionalList.appendChild(title);

    currentItemData.optionalIngredients.forEach(option => {
      const div = document.createElement('div');
      div.className = 'ingredient-option';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = `option-${option.name.replace(/\s+/g, '-').toLowerCase()}`;
      checkbox.dataset.price = option.price || 0;

      const label = document.createElement('label');
      label.htmlFor = checkbox.id;
      label.textContent = `${option.name}${option.price > 0 ? ` (+$${option.price.toFixed(2)})` : ''}`;

      div.appendChild(checkbox);
      div.appendChild(label);
      optionalList.appendChild(div);
    });
  }
}

// Close modal
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Handle login modal close
const loginModal = document.getElementById('login-modal');
const profileModal = document.getElementById('profile-modal');

if (loginModal) {
  const loginCloseBtn = loginModal.querySelector('.close-modal');
  if (loginCloseBtn) {
    loginCloseBtn.addEventListener('click', () => {
      loginModal.style.display = 'none';
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
      loginModal.style.display = 'none';
    }
  });
}

if (profileModal) {
  const profileCloseBtn = profileModal.querySelector('.close-modal');
  if (profileCloseBtn) {
    profileCloseBtn.addEventListener('click', () => {
      profileModal.style.display = 'none';
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === profileModal) {
      profileModal.style.display = 'none';
    }
  });


}