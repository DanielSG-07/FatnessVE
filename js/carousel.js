// Carousel functionality
import { carouselImages } from './carouselData.js';

const carouselInner = document.querySelector('.carousel-inner');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

let currentIndex = 0;
let totalImages = 0;
let autoPlayInterval;

// Load carousel images from data
function loadCarouselImages() {
  if (carouselInner && typeof carouselImages !== 'undefined') {
    carouselInner.innerHTML = '';
    carouselImages.forEach(image => {
      const itemContainer = document.createElement('div');
      itemContainer.className = 'carousel-item';

      const imgElement = document.createElement('img');
      imgElement.src = image.src;
      imgElement.alt = image.alt;

      const titleElement = document.createElement('div');
      titleElement.className = 'carousel-title';
      titleElement.textContent = image.name;

      const priceElement = document.createElement('div');
      priceElement.className = 'carousel-price';
      priceElement.textContent = `$${image.discountedPrice.toFixed(2)}`;

      const buttonElement = document.createElement('button');
      buttonElement.className = 'carousel-btn-offer';
      buttonElement.textContent = 'Adquirir Oferta';
      buttonElement.addEventListener('click', () => addToCartFromCarousel(image));

      itemContainer.appendChild(imgElement);
      itemContainer.appendChild(titleElement);
      itemContainer.appendChild(priceElement);
      itemContainer.appendChild(buttonElement);
      carouselInner.appendChild(itemContainer);
    });
    totalImages = carouselImages.length;
    // Initialize event listeners after loading images
    initializeCarouselControls();
  } else {
    // Fallback to existing images if data not loaded
    totalImages = document.querySelectorAll('.carousel-inner img').length;
  }
}

// Function to add item to cart from carousel
function addToCartFromCarousel(item) {
  const cartItem = {
    image: item.src,
    title: item.name,
    description: `Promoción especial: ${item.name}`,
    price: item.discountedPrice,
    originalPrice: item.originalPrice,
    isDiscounted: true,
    customizations: []
  };

  // Add to cart (using global window.cart from cart.js)
  if (typeof window.cart !== 'undefined') {
    // Use the same findCartItem function from cart.js if available
    let existingIndex = -1;
    if (typeof window.findCartItem === 'function') {
      existingIndex = window.findCartItem(cartItem.title, cartItem.customizations);
    } else {
      // Fallback to manual search with proper validation
      existingIndex = window.cart.findIndex(cartEntry =>
        cartEntry &&
        cartEntry.item &&
        typeof cartEntry.item === 'object' &&
        cartEntry.item.title === cartItem.title &&
        Array.isArray(cartEntry.item.customizations) &&
        Array.isArray(cartItem.customizations) &&
        cartEntry.item.customizations.length === cartItem.customizations.length &&
        JSON.stringify(cartEntry.item.customizations.sort()) === JSON.stringify(cartItem.customizations.sort())
      );
    }

    if (existingIndex !== -1) {
      // Increment quantity
      window.cart[existingIndex].quantity += 1;
    } else {
      // Add new item with quantity 1
      window.cart.push({ item: cartItem, quantity: 1 });
    }

    if (typeof window.updateCartCount === 'function') {
      window.updateCartCount();
    }
    if (typeof window.saveCart === 'function') {
      window.saveCart();
    }
    // If cart is open, update the display
    const cartDisplay = document.getElementById('cart-display');
    if (cartDisplay && cartDisplay.style.display === 'block') {
      if (typeof window.renderCart === 'function') {
        window.renderCart();
      }
    }
    // Mostrar notificación temporal por 1 segundo
    const notification = document.createElement('div');
    notification.textContent = 'Se ha adquirido la oferta';
    notification.style.position = 'fixed';
    notification.style.top = '50%';
    notification.style.left = '50%';
    notification.style.transform = 'translate(-50%, -50%)';
    notification.style.backgroundColor = '#111';
    notification.style.color = '#fff';
    notification.style.padding = '20px';
    notification.style.borderRadius = '10px';
    notification.style.zIndex = '10001';
    notification.style.fontSize = '1.2rem';
    notification.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
    document.body.appendChild(notification);
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 1000);
  } else {
    console.error('Cart not available');
  }
}

function updateCarousel() {
  if (totalImages > 0) {
    const translateX = -currentIndex * (100 / totalImages);
    carouselInner.style.transform = `translateX(${translateX}%)`;
  }
}

// Function to initialize carousel controls
function initializeCarouselControls() {
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalImages - 1;
      updateCarousel();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex < totalImages - 1) ? currentIndex + 1 : 0;
      updateCarousel();
    });
  }

  // Auto-play carousel
  autoPlayInterval = setInterval(() => {
    if (totalImages > 0) {
      currentIndex = (currentIndex < totalImages - 1) ? currentIndex + 1 : 0;
      updateCarousel();
    }
  }, 3000);

  // Pause auto-play on hover
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', () => {
      clearInterval(autoPlayInterval);
    });
    carousel.addEventListener('mouseleave', () => {
      autoPlayInterval = setInterval(() => {
        if (totalImages > 0) {
          currentIndex = (currentIndex < totalImages - 1) ? currentIndex + 1 : 0;
          updateCarousel();
        }
      }, 3000);
    });
  }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', loadCarouselImages);
