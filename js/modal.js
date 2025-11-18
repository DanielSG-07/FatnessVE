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

    // Populate ingredients
    populateIngredients(title);

    modal.style.display = 'flex';
  });
});

// Populate ingredients based on item
function populateIngredients(itemTitle) {
  currentItemData = menuData[itemTitle];

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

  // Optional ingredients
  optionalList.innerHTML = '';
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
