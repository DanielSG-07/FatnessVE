import { openDeliveryModal } from './deliveryModal.js';

// Cart functionality
let cart = [];

const cartIcon = document.querySelector('.cart-icon');
const cartCount = document.getElementById('cart-count');
const cartDisplay = document.getElementById('cart-display');
const closeCart = document.querySelector('.close-cart');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const addToCartBtn = document.getElementById('add-to-cart-btn');
const checkoutBtn = document.getElementById('checkout-btn');

// Function to adjust cart position to avoid overlapping with footer
function adjustCartPosition() {
  const footer = document.querySelector('footer');
  if (!footer) return;
  const footerRect = footer.getBoundingClientRect();
  const cartDisplay = document.getElementById('cart-display');
  const cartIcon = document.querySelector('.cart-icon');

  // Adjust cart modal if open
  if (cartDisplay && cartDisplay.style.display !== 'none') {
    if (footerRect.top < window.innerHeight) {
      // Footer is visible, adjust bottom to be above footer
      cartDisplay.style.bottom = `${footerRect.height + 20}px`;
    } else {
      // Footer not visible, reset to default
      cartDisplay.style.bottom = '100px';
    }
  }

  // Adjust cart icon
  if (cartIcon) {
    if (footerRect.top < window.innerHeight) {
      // Footer is visible, adjust bottom to be above footer
      cartIcon.style.bottom = `${footerRect.height + 20}px`;
    } else {
      // Footer not visible, reset to default
      cartIcon.style.bottom = '20px';
    }
  }
}

// Add scroll and resize listeners for dynamic adjustment
window.addEventListener('scroll', adjustCartPosition);
window.addEventListener('resize', adjustCartPosition);

// Function to get the current cart
export function getCart() {
  return cart;
}

// Function to clear the cart
export function clearCart() {
  cart = [];
  saveCart();
  updateCartCount();
  // If the cart display is open, re-render it to show it's empty
  if (cartDisplay && cartDisplay.style.display === 'block') {
    renderCart();
  }
}

// Initialize cart count if element exists
if (cartCount) {
  cartCount.textContent = '0';
}

// Helper function to find item in cart (made global for use in other scripts)
window.findCartItem = function(title, customizations, sabor, brand, presentation) {
  return cart.findIndex(cartItem =>
    cartItem &&
    cartItem.item &&
    typeof cartItem.item === 'object' &&
    cartItem.item.title === title &&
    cartItem.item.sabor === sabor &&
    cartItem.item.brand === brand &&
    cartItem.item.presentation === presentation &&
    Array.isArray(cartItem.item.customizations) &&
    Array.isArray(customizations) &&
    cartItem.item.customizations.length === customizations.length &&
    JSON.stringify(cartItem.item.customizations.sort()) === JSON.stringify(customizations.sort())
  );
}

// Load cart from localStorage
function loadCart() {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    try {
      const parsedCart = JSON.parse(savedCart);
      // Validate cart structure
      if (Array.isArray(parsedCart)) {
        cart = parsedCart.filter(cartItem =>
          cartItem &&
          typeof cartItem === 'object' &&
          cartItem.item &&
          typeof cartItem.item === 'object' &&
          typeof cartItem.quantity === 'number' &&
          cartItem.quantity > 0
        );
      }
      updateCartCount();
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      cart = [];
      localStorage.removeItem('cart');
    }
  }
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', loadCart);

// Add to cart functionality
if (addToCartBtn) {
  addToCartBtn.addEventListener('click', () => {
    const modalPriceElement = document.getElementById('modal-price');
    if (!modalPriceElement) return;

    const basePriceText = modalPriceElement.textContent.replace('$', '').trim();
    const basePrice = parseFloat(basePriceText);

    if (isNaN(basePrice)) {
      console.error('Invalid base price:', basePriceText);
      return;
    }

    let additionalPrice = 0;
    const customizations = [];
    let sabor = '';
    let brand = '';
    let presentation = '';

    // Handle brand selection
    const brandButton = document.querySelector('.brand-button.selected');
    if (brandButton) {
      brand = brandButton.dataset.brand;
    }

    // Handle presentation/size selection
    const selectedPresentacion = document.querySelector('input[name="presentacion-choice"]:checked');
    if (selectedPresentacion) {
        const presentacionName = selectedPresentacion.nextElementSibling.textContent.split(' (+$')[0];
        const presentacionPrice = parseFloat(selectedPresentacion.dataset.price) || 0;
        additionalPrice += presentacionPrice;
        presentation = presentacionName;
    }

    // Get all selected radio buttons for exclusive choices
    document.querySelectorAll('#optional-list input[type="radio"]:checked').forEach(radio => {
      const price = parseFloat(radio.dataset.price) || 0;
      if (radio.name !== 'presentacion-choice') { // Price for presentation is already added
        additionalPrice += price;
      }

      if (radio.name === 'sabor-choice') {
        sabor = radio.nextElementSibling.textContent.split(' (+$')[0];
      } else if (radio.name !== 'presentacion-choice') {
        customizations.push(radio.nextElementSibling.textContent.split(' (+$')[0]);
      }
    });

    // Get selected checkboxes (for optional extras)
    document.querySelectorAll('#optional-list input[type="checkbox"]:checked').forEach(checkbox => {
      const price = parseFloat(checkbox.dataset.price);
      if (!isNaN(price)) {
        additionalPrice += price;
      }
      customizations.push(checkbox.nextElementSibling.textContent.split(' (+$')[0]);
    });

    const item = {
      image: document.getElementById('modal-image').src,
      title: document.getElementById('modal-title').textContent,
      description: document.getElementById('modal-description').textContent,
      price: basePrice + additionalPrice,
      customizations: customizations,
      sabor: sabor,
      brand: brand,
      presentation: presentation
    };

    // Check if item already exists in cart
    const existingIndex = findCartItem(item.title, customizations, item.sabor, item.brand, item.presentation);
    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({ item, quantity: 1 });
    }

    updateCartCount();
    saveCart();

    if (cartDisplay && cartDisplay.style.display === 'block') {
      renderCart();
    }

    const modal = document.getElementById('item-modal');
    if (modal) {
      modal.style.display = 'none';
    }
  });
}

// Update cart count
function updateCartCount() {
  const totalItems = cart.reduce((sum, cartItem) => sum + cartItem.quantity, 0);
  if (cartCount) {
    cartCount.textContent = totalItems;
  }
}

// Show/hide cart
if (cartIcon) {
  cartIcon.addEventListener('click', () => {
    if (cartDisplay.style.display === 'block') {
      cartDisplay.style.display = 'none';
    } else {
      renderCart();
      cartDisplay.style.display = 'block';
      adjustCartPosition(); // Adjust position when opening
    }
  });
}

if (closeCart) {
  closeCart.addEventListener('click', () => {
    cartDisplay.style.display = 'none';
  });
}

// Render cart items
function renderCart() {
  if (!cartItems) return;

  cartItems.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'Ve a la sección de Nuestro Menú para empezar a Comprar, o mira Nuestra Sección de Ofertas del Día';
    emptyMessage.style.textAlign = 'center';
    emptyMessage.style.color = '#ccc';
    emptyMessage.style.fontSize = '14px';
    emptyMessage.style.padding = '20px';
    cartItems.appendChild(emptyMessage);
    if (cartTotal) {
      cartTotal.textContent = '0.00';
    }
  } else {
    cart.forEach((cartItem, index) => {
      // Validate cart item structure
      if (!cartItem ||
          !cartItem.item ||
          typeof cartItem.item !== 'object' ||
          typeof cartItem.item.price !== 'number' ||
          typeof cartItem.quantity !== 'number' ||
          cartItem.quantity <= 0) {
        console.warn('Invalid cart item found, skipping:', cartItem);
        return;
      }

      const item = cartItem.item;
      const quantity = cartItem.quantity;
      const itemTotal = item.price * quantity;
      total += itemTotal;

      const cartItemDiv = document.createElement('div');
      cartItemDiv.className = 'cart-item';

      let saborText = '';
      if (item.sabor) {
        saborText = `<p class="customizations">Sabor: ${item.sabor}</p>`;
      }

      let brandText = '';
      if (item.brand) {
        brandText = `<p class="customizations">Marca: ${item.brand}</p>`;
      }

      let presentationText = '';
      if (item.presentation) {
        presentationText = `<p class="customizations">Presentación: ${item.presentation}</p>`;
      }

      let customizationsText = '';
      if (item.customizations && item.customizations.length > 0) {
        customizationsText = `<p class="customizations">Adicionales: ${item.customizations.join(', ')}</p>`;
      }

      let tipoText = '';
      const papasFrancesasItems = ["CLÁSICAS", "CHEDDAR", "SALCHICHA", "SALCHICHA Y CHEDDAR", "GRINGAS", "POLLO Y CHEDDAR", "FATNESS (3-4 PERSONAS)", "½ FATNESS (1-2 PERSONAS)"];
      const perrosCalientesItems = ["VIENA", "CHORIFRITO", "ALEMANA", "ANTIOQUEÑO", "KOSACA", "SELVA NEGRA", "POLACA", "BAVARIA", "FATNESS"];
      let title = item.title;

      if (papasFrancesasItems.includes(item.title)) {
        title = "Papas Francesas";
        tipoText = `<p class="customizations">Tipo: ${item.title}</p>`;
      } else if (perrosCalientesItems.includes(item.title)) {
        title = "Perro Caliente";
        tipoText = `<p class="customizations">Tipo: ${item.title}</p>`;
      }

      let priceText = `$${item.price.toFixed(2)}`;
      if (item.isDiscounted && item.originalPrice) {
        priceText = `<span style="text-decoration: line-through; color: #ccc;">$${item.originalPrice.toFixed(2)}</span> $${item.price.toFixed(2)} <span style="color: #ff6b35; font-weight: bold;">(Descuento)</span>`;
      }

      cartItemDiv.innerHTML = `
        <div class="cart-item-left">
          <img src="${item.image}" alt="${item.title}" class="cart-item-image">
          <div class="cart-item-info">
            <h4>${title}</h4>
            <p>${priceText}</p>
            ${tipoText}
            ${saborText}
            ${brandText}
            ${presentationText}
            ${customizationsText}
          </div>
        </div>
        <div class="cart-item-right">
          <div class="quantity-controls vertical">
            <button class="quantity-btn increase" data-index="${index}">+</button>
            <span class="quantity">${quantity}</span>
            <button class="quantity-btn decrease" data-index="${index}">-</button>
          </div>
          <button class="remove-item" data-index="${index}">Remover</button>
        </div>
      `;

      cartItems.appendChild(cartItemDiv);
    });

    if (cartTotal) {
      cartTotal.textContent = total.toFixed(2);
    }

    // Add event listeners for quantity buttons
    document.querySelectorAll('.quantity-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.target.getAttribute('data-index'));
        const action = e.target.classList.contains('increase') ? 'increase' : 'decrease';

        if (action === 'increase') {
          cart[index].quantity += 1;
        } else if (action === 'decrease') {
          if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
          } else {
            cart.splice(index, 1);
          }
        }

        updateCartCount();
        saveCart();
        renderCart();
      });
    });

    // Add remove event listeners
    document.querySelectorAll('.remove-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.target.getAttribute('data-index'));
        cart.splice(index, 1);
        updateCartCount();
        saveCart();
        renderCart();
      });
    });

    // Add swipe-to-delete functionality for mobile devices
    if (window.innerWidth <= 768) {
      document.querySelectorAll('.cart-item').forEach((item, index) => {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        item.addEventListener('touchstart', (e) => {
          // Prevent swipe if touching buttons
          if (e.target.closest('.quantity-btn') || e.target.closest('.remove-item')) {
            return;
          }
          startX = e.touches[0].clientX;
          isDragging = true;
        });

        item.addEventListener('touchmove', (e) => {
          if (!isDragging) return;
          currentX = e.touches[0].clientX;
          const diffX = currentX - startX;
          if (Math.abs(diffX) > 10) { // Prevent accidental swipes
            item.style.transform = `translateX(${diffX}px)`;
          }
        });

        item.addEventListener('touchend', (e) => {
          if (!isDragging) return;
          isDragging = false;
          const diffX = currentX - startX;

          if (Math.abs(diffX) > 50) { // Swipe threshold
            // Remove one quantity of item
            if (cart[index].quantity > 1) {
              cart[index].quantity -= 1;
            } else {
              cart.splice(index, 1);
            }
            updateCartCount();
            saveCart();
            renderCart();
          } else {
            // Reset position
            item.style.transform = 'translateX(0)';
          }
        });
      });
    }
  }
}
export { renderCart };

// Checkout functionality - Open delivery options modal
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
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
