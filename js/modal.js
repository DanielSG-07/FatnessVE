import { getAvailableDeliveryTypes } from './deliveryModal.js';

// Modal functionality
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

let currentItemData = null;

// Open modal on menu item click
document.querySelectorAll('.menu-item').forEach(item => {
  item.addEventListener('click', () => {
    const imgSrc = item.querySelector('img').src;
    const title = item.querySelector('h4').textContent.trim();
    const description = item.querySelector('p').textContent;
    const price = item.querySelector('.price').textContent;

    modalImage.src = imgSrc;
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modalPrice.textContent = price;

    // Populate ingredients and delivery icons
    populateIngredients(title);
    updateDeliveryIcons(title);

    modal.style.display = 'flex';
  });
});

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
      radio.dataset.price = option.price;
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
      brandButton.textContent = option.name;
      brandButton.dataset.brand = option.name;

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
      radio.dataset.price = option.price;
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
      radio.dataset.price = option.price;
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
      checkbox.dataset.price = option.price;

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