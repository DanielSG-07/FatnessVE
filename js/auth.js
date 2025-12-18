import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { auth } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', function() {
    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const signinForm = document.getElementById('signin-form');
    const signupForm = document.getElementById('signup-form');
    const googleSigninBtn = document.getElementById('google-signin-btn');

    // Switch to register form
    if (showRegister) {
        showRegister.addEventListener('click', (e) => {
            e.preventDefault();
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
        });
    }

    // Switch to login form
    if (showLogin) {
        showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            registerForm.style.display = 'none';
            loginForm.style.display = 'block';
        });
    }

    // Handle sign-in form submission
    if (signinForm) {
        signinForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('signin-email').value;
            const password = document.getElementById('signin-password').value;

            if (!email || !password) {
                alert('Por favor, complete todos los campos.');
                return;
            }

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    console.log('User signed in:', userCredential.user);
                    signinForm.reset();
                    // The onAuthStateChanged in app.js will handle the UI changes and close the modal.
                })
                .catch((error) => {
                    console.error('Sign-in error:', error);
                    const errorElement = document.getElementById('signin-error');
                    if (errorElement) {
                        errorElement.textContent = 'Contraseña incorrecta';
                        errorElement.style.display = 'block';
                    }
                });
        });
    }

    // Password validation function
    function validatePassword(password) {
        const minLength = password.length >= 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasSpecialChar = /[!@#$%^&*]/.test(password);
        return { minLength, hasUppercase, hasSpecialChar };
    }

    // Update password requirements display
    function updatePasswordRequirements(password) {
        const { minLength, hasUppercase, hasSpecialChar } = validatePassword(password);
        const reqLength = document.getElementById('req-length');
        const reqUppercase = document.getElementById('req-uppercase');
        const reqSpecial = document.getElementById('req-special');
        const tooltip = document.getElementById('password-tooltip');

        if (reqLength) {
            reqLength.style.color = minLength ? 'green' : 'red';
        }
        if (reqUppercase) {
            reqUppercase.style.color = hasUppercase ? 'green' : 'red';
        }
        if (reqSpecial) {
            reqSpecial.style.color = hasSpecialChar ? 'green' : 'red';
        }

        // Show tooltip when typing
        if (tooltip && password.length > 0) {
            tooltip.style.display = 'block';
        } else if (tooltip) {
            tooltip.style.display = 'none';
        }
    }

    // Password toggle functionality
    const passwordToggle = document.getElementById('signup-password-toggle');
    const passwordInput = document.getElementById('signup-password');
    const confirmPasswordToggle = document.getElementById('signup-confirm-password-toggle');
    const confirmPasswordInput = document.getElementById('signup-confirm-password');

    if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            // Toggle eye icon (you can add more icons if needed)
        });
    }

    if (confirmPasswordToggle && confirmPasswordInput) {
        confirmPasswordToggle.addEventListener('click', () => {
            const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            confirmPasswordInput.setAttribute('type', type);
        });
    }

    // Listen for password input changes
    if (passwordInput) {
        passwordInput.addEventListener('input', (e) => {
            updatePasswordRequirements(e.target.value);
        });
        passwordInput.addEventListener('blur', () => {
            const tooltip = document.getElementById('password-tooltip');
            if (tooltip) {
                tooltip.style.display = 'none';
            }
        });
        passwordInput.addEventListener('focus', () => {
            const password = passwordInput.value;
            if (password.length > 0) {
                const tooltip = document.getElementById('password-tooltip');
                if (tooltip) {
                    tooltip.style.display = 'block';
                }
            }
        });
    }

    // Listen for confirm password input changes
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', (e) => {
            const password = passwordInput ? passwordInput.value : '';
            const confirmPassword = e.target.value;
            const errorElement = document.getElementById('confirm-password-error');
            if (errorElement) {
                if (confirmPassword && password !== confirmPassword) {
                    errorElement.textContent = 'Las contraseñas no coinciden.';
                    errorElement.style.display = 'block';
                } else {
                    errorElement.style.display = 'none';
                }
            }
        });
    }

    // Handle sign-up form submission
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm-password').value;

            if (!name || !email || !password || !confirmPassword) {
                const errorElement = document.getElementById('signup-error');
                if (errorElement) {
                    errorElement.textContent = 'Por favor, complete todos los campos.';
                    errorElement.style.display = 'block';
                }
                return;
            }
            // Password mismatch is already handled in real-time, but check again for submission
            if (password !== confirmPassword) {
                const errorElement = document.getElementById('confirm-password-error');
                if (errorElement) {
                    errorElement.textContent = 'Las contraseñas no coinciden.';
                    errorElement.style.display = 'block';
                }
                return;
            }

            const { minLength, hasUppercase, hasSpecialChar } = validatePassword(password);
            if (!minLength || !hasUppercase || !hasSpecialChar) {
                const errorElement = document.getElementById('signup-error');
                if (errorElement) {
                    errorElement.textContent = 'La contraseña no cumple con los requisitos.';
                    errorElement.style.display = 'block';
                }
                return;
            }

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Set the user's display name
                    return updateProfile(userCredential.user, {
                        displayName: name
                    });
                })
                .then(() => {
                    const user = auth.currentUser;
                    console.log('User registered and profile updated:', user);

                    // Manually set localStorage to prevent race condition with onAuthStateChanged
                    if (user) {
                        localStorage.setItem('user', JSON.stringify({
                            name: user.displayName,
                            email: user.email
                        }));
                    }

                    signupForm.reset();
                    // Update UI immediately with the name
                    const welcomeElement = document.getElementById('user-welcome');
                    const userAvatar = document.getElementById('user-avatar');
                    const loginIcon = document.getElementById('login-icon');
                    const loginModal = document.getElementById('login-modal');
                    if (welcomeElement) {
                        welcomeElement.textContent = 'Bienvenido ' + user.displayName;
                    }
                    if (userAvatar) {
                        userAvatar.src = 'resourses/IconoBasico.png'; // Default avatar
                    }
                    if (loginIcon) {
                        loginIcon.onclick = () => {
                            // Open profile modal, but since it's not defined here, perhaps trigger the app.js function
                            // For now, just close login modal
                        };
                    }
                    if (loginModal && loginModal.style.display === 'flex') {
                        loginModal.style.display = 'none';
                    }
                    alert('¡Registro exitoso! Se ha iniciado sesión automáticamente.');
                })
                .catch((error) => {
                    console.error('Sign-up error:', error);
                    const errorElement = document.getElementById('signup-error');
                    if (errorElement) {
                        if (error.code === 'auth/email-already-in-use') {
                            errorElement.textContent = 'El correo electrónico ya está registrado';
                        } else {
                            errorElement.textContent = 'Error en el registro: ' + error.message;
                        }
                        errorElement.style.display = 'block';
                    }
                });
        });
    }

    // Handle Google Sign-In button click
    if (googleSigninBtn) {
        googleSigninBtn.addEventListener('click', () => {
            const provider = new GoogleAuthProvider();
            signInWithPopup(auth, provider)
                .then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    // The signed-in user info.
                    const user = result.user;
                    console.log('Google sign-in successful:', user);
                    // The onAuthStateChanged in app.js will handle the UI changes and close the modal.
                }).catch((error) => {
                    // Handle Errors here.
                    console.error('Google sign-in error:', error);
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    const email = error.customData.email;
                    // The AuthCredential type that was used.
                    const credential = GoogleAuthProvider.credentialFromError(error);
                    // Only show alert for errors other than popup closed by user
                    if (errorCode !== 'auth/popup-closed-by-user') {
                        alert(`Error con Google: ${errorMessage}`);
                    }
                });
        });
    }
});