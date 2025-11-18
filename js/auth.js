// Authentication functionality - handles login and register form switching
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements with existence checks
    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const signinForm = document.getElementById('signin-form');
    const signupForm = document.getElementById('signup-form');

    // Switch to register form
    if (showRegister && loginForm && registerForm) {
        showRegister.addEventListener('click', function(e) {
            e.preventDefault();
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
        });
    }

    // Switch to login form
    if (showLogin && loginForm && registerForm) {
        showLogin.addEventListener('click', function(e) {
            e.preventDefault();
            registerForm.style.display = 'none';
            loginForm.style.display = 'block';
        });
    }

    // Handle login form submission
    if (signinForm) {
        signinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('signin-email');
            const password = document.getElementById('signin-password');

            // Basic validation
            if (!email || !password || !email.value || !password.value) {
                alert('Por favor, complete todos los campos.');
                return;
            }

            // Here you would typically send the data to your backend
            console.log('Login attempt:', { email: email.value, password: password.value });

            // For demo purposes, just close the modal
            alert('Inicio de sesión exitoso (demo)');
            const loginModal = document.getElementById('login-modal');
            if (loginModal) {
                loginModal.style.display = 'none';
            }
            signinForm.reset();
        });
    }

    // Handle register form submission
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('signup-name');
            const email = document.getElementById('signup-email');
            const password = document.getElementById('signup-password');
            const confirmPassword = document.getElementById('signup-confirm-password');

            // Basic validation
            if (!name || !email || !password || !confirmPassword || 
                !name.value || !email.value || !password.value || !confirmPassword.value) {
                alert('Por favor, complete todos los campos.');
                return;
            }

            if (password.value !== confirmPassword.value) {
                alert('Las contraseñas no coinciden.');
                return;
            }

            if (password.value.length < 6) {
                alert('La contraseña debe tener al menos 6 caracteres.');
                return;
            }

            // Here you would typically send the data to your backend
            console.log('Register attempt:', { 
                name: name.value, 
                email: email.value, 
                password: password.value 
            });

            // For demo purposes, just close the modal and switch to login
            alert('Registro exitoso (demo). Ahora puedes iniciar sesión.');
            
            // Switch back to login form
            if (registerForm && loginForm) {
                registerForm.style.display = 'none';
                loginForm.style.display = 'block';
            }
            
            signupForm.reset();
        });
    }
});
