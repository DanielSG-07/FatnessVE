// Main script functionality
document.addEventListener('DOMContentLoaded', () => {
  // Load menu data and render menu
  if (typeof menuData !== 'undefined') {
    renderMenu();
  }

  // Initialize other components
  initScrollEffects();
});

  // Category tab switching functionality
   const categoryTabs = document.querySelectorAll('.category-tab');
  const categories = document.querySelectorAll('.category');

  categoryTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const category = this.getAttribute('data-category');

      // Remove active class from all tabs and categories
      categoryTabs.forEach(t => t.classList.remove('active'));
      categories.forEach(c => c.classList.remove('active'));

      // Add active class to clicked tab and corresponding category
      this.classList.add('active');
      const activeCategory = document.querySelector(`.category[data-category="${category}"]`);
      if (activeCategory) {
        activeCategory.classList.add('active');
      }
    });
  });
  
// Render menu items
function renderMenu() {
  const menuContainer = document.querySelector('.menu-container');
  if (!menuContainer) return;

  menuContainer.innerHTML = '';

  menuData.categories.forEach(category => {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'menu-category';
    categoryDiv.innerHTML = `<h2 class="category-title">${category.name}</h2>`;

    const itemsGrid = document.createElement('div');
    itemsGrid.className = 'menu-items-grid';

    category.items.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'menu-item';
      itemDiv.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="menu-item-image">
        <div class="menu-item-content">
          <h3 class="menu-item-title">${item.title}</h3>
          <p class="menu-item-description">${item.description}</p>
          <span class="menu-item-price">$${item.price.toFixed ? item.price.toFixed(2) : item.price}</span>
          <button class="btn view-details-btn" data-item='${JSON.stringify(item)}'>Ver Detalles</button>
        </div>
      `;
      itemsGrid.appendChild(itemDiv);
    });

    categoryDiv.appendChild(itemsGrid);
    menuContainer.appendChild(categoryDiv);
  });

  // Add event listeners to view details buttons
  document.querySelectorAll('.view-details-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const item = JSON.parse(e.target.getAttribute('data-item'));
      showItemModal(item);
    });
  });
}

// Initialize scroll effects
function initScrollEffects() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, observerOptions);

  // Observe menu items
  document.querySelectorAll('.menu-item').forEach(item => {
    observer.observe(item);
  });

  // Observe carousel items
  document.querySelectorAll('.carousel-item').forEach(item => {
    observer.observe(item);
  });
}

// Function to show item modal (defined in modal.js)
function showItemModal(item) {
  if (typeof showItemModal !== 'undefined') {
    showItemModal(item);
  } else {
    console.error('showItemModal function is not defined');
  }
}

  // // Login Modal Functionality
  // const loginIcon = document.getElementById('login-icon');
  // const loginModal = document.getElementById('login-modal');
  // const profileModal = document.getElementById('profile-modal');
  // const closeLoginModal = loginModal.querySelector('.close-modal');
  // const closeProfileModal = profileModal ? profileModal.querySelector('.close-modal') : null;
  // const showRegister = document.getElementById('show-register');
  // const showLogin = document.getElementById('show-login');
  // const loginForm = document.getElementById('login-form');
  // const registerForm = document.getElementById('register-form');
  // const signinForm = document.getElementById('signin-form');
  // const signupForm = document.getElementById('signup-form');

  // // Close login modal
  // if (closeLoginModal) {
  //   closeLoginModal.addEventListener('click', function() {
  //     loginModal.style.display = 'none';
  //   });
  // }

  // // Close profile modal
  // if (closeProfileModal) {
  //   closeProfileModal.addEventListener('click', function() {
  //     profileModal.style.display = 'none';
  //   });
  // }

  // // Close login modal when clicking outside
  // loginModal.addEventListener('click', function(event) {
  //   if (event.target === loginModal) {
  //     loginModal.style.display = 'none';
  //   }
  // });

  // // Close profile modal when clicking outside
  // if (profileModal) {
  //   profileModal.addEventListener('click', function(event) {
  //     if (event.target === profileModal) {
  //       profileModal.style.display = 'none';
  //     }
  //   });
  // }

  // // Switch to register form
  // if (showRegister) {
  //   showRegister.addEventListener('click', function(e) {
  //     e.preventDefault();
  //     loginForm.style.display = 'none';
  //     registerForm.style.display = 'block';
  //   });
  // }

  // // Switch to login form
  // if (showLogin) {
  //   showLogin.addEventListener('click', function(e) {
  //     e.preventDefault();
  //     registerForm.style.display = 'none';
  //     loginForm.style.display = 'block';
  //   });
  // }

  // // Handle login form submission
  // if (signinForm) {
  //   signinForm.addEventListener('submit', function(e) {
  //     e.preventDefault();
  //     const email = document.getElementById('signin-email').value;
  //     const password = document.getElementById('signin-password').value;

  //     // Basic validation
  //     if (!email || !password) {
  //       alert('Por favor, complete todos los campos.');
  //       return;
  //     }

  //     // Here you would typically send the data to your backend
  //     console.log('Login attempt:', { email, password });

  //     // For demo purposes, just close the modal
  //     alert('Inicio de sesión exitoso (demo)');
  //     loginModal.style.display = 'none';
  //     signinForm.reset();
  //   });
  // }

  // // Handle register form submission
  // if (signupForm) {
  //   signupForm.addEventListener('submit', function(e) {
  //     e.preventDefault();
  //     const name = document.getElementById('signup-name').value;
  //     const email = document.getElementById('signup-email').value;
  //     const password = document.getElementById('signup-password').value;
  //     const confirmPassword = document.getElementById('signup-confirm-password').value;

  //     // Basic validation
  //     if (!name || !email || !password || !confirmPassword) {
  //       alert('Por favor, complete todos los campos.');
  //       return;
  //     }

  //     if (password !== confirmPassword) {
  //       alert('Las contraseñas no coinciden.');
  //       return;
  //     }

  //     if (password.length < 6) {
  //       alert('La contraseña debe tener al menos 6 caracteres.');
  //       return;
  //     }

  //     // Here you would typically send the data to your backend
  //     console.log('Register attempt:', { name, email, password });

  //     // For demo purposes, just close the modal
  //     alert('Registro exitoso (demo)');
  //     loginModal.style.display = 'none';
  //     signupForm.reset();
  //   });
  // }