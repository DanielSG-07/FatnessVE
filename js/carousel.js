// Carousel functionality
const carouselInner = document.querySelector('.carousel-inner');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

let currentIndex = 0;
let totalImages = 0;

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

  // Add to cart (assuming cart is global from cart.js)
  if (typeof cart !== 'undefined') {
    // Use the same findCartItem function from cart.js if available
    let existingIndex = -1;
    if (typeof findCartItem === 'function') {
      existingIndex = findCartItem(cartItem.title, cartItem.customizations);
    } else {
      // Fallback to manual search with proper validation
      existingIndex = cart.findIndex(cartEntry =>
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
      cart[existingIndex].quantity += 1;
    } else {
      // Add new item with quantity 1
      cart.push({ item: cartItem, quantity: 1 });
    }
    
    if (typeof updateCartCount === 'function') {
      updateCartCount();
    }
    if (typeof saveCart === 'function') {
      saveCart();
    }
    alert(`${item.name} agregado al carrito con descuento!`);
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
setInterval(() => {
  if (totalImages > 0) {
    currentIndex = (currentIndex < totalImages - 1) ? currentIndex + 1 : 0;
    updateCarousel();
  }
}, 3000);

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', loadCarouselImages);
