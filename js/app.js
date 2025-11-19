import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { auth } from './firebase-config.js';

const welcomeElement = document.getElementById('user-welcome');
const userAvatar = document.getElementById('user-avatar');
const loginIcon = document.getElementById('login-icon');
const loginModal = document.getElementById('login-modal');
const profileModal = document.getElementById('profile-modal');
const signoutBtn = document.getElementById('signout-btn');

// Function to open the login modal
function openLoginModal() {
    if (loginModal) {
        loginModal.style.display = 'flex';
    }
}

// Function to open the profile modal
function openProfileModal(user) {
    const profileAvatar = document.getElementById('profile-avatar');
    const profileName = document.getElementById('profile-name');
    const profileEmail = document.getElementById('profile-email');
    const profileProvider = document.getElementById('profile-provider');

    if (profileAvatar) {
        profileAvatar.src = user.photoURL || 'resourses/IconoBasico.png';
        profileAvatar.onerror = function() {
            this.src = 'resourses/IconoBasico.png';
            this.onerror = null;
        };
    }
    if (profileName) profileName.textContent = user.displayName || 'Usuario';
    if (profileEmail) profileEmail.textContent = user.email;
    if (profileProvider) {
        const providerId = user.providerData[0]?.providerId;
        if (providerId === 'password') {
            profileProvider.textContent = 'Correo';
        } else {
            profileProvider.textContent = providerId?.split('.')[0] || 'firebase';
        }
    }


    if (profileModal) {
        profileModal.style.display = 'flex';
    }
}

// Listen for authentication state changes
onAuthStateChanged(auth, user => {
    if (user) {
        // User is signed in
        console.log('User is signed in:', user);
        localStorage.setItem('user', JSON.stringify({
            name: user.displayName || user.email,
            email: user.email
        }));
        if (welcomeElement) {
            welcomeElement.textContent = 'Bienvenido ' + (user.displayName || user.email);
        }
        if (userAvatar) {
            userAvatar.src = user.photoURL || 'resourses/IconoBasico.png';
            userAvatar.onerror = function() {
                this.src = 'resourses/IconoBasico.png';
                this.onerror = null;
            };
        }
        if (loginIcon) {
            loginIcon.onclick = () => openProfileModal(user);
        }
        // Close login modal if it's open
        if (loginModal && loginModal.style.display === 'flex') {
            loginModal.style.display = 'none';
        }
    } else {
        // User is signed out
        console.log('User is signed out');
        localStorage.removeItem('user');
        if (welcomeElement) {
            welcomeElement.textContent = '';
        }
        if (userAvatar) {
            userAvatar.src = 'resourses/IconoBasico.png';
            userAvatar.onerror = null;
        }
        if (loginIcon) {
            loginIcon.onclick = openLoginModal;
        }
        // Close profile modal if it's open
        if (profileModal && profileModal.style.display === 'flex') {
            profileModal.style.display = 'none';
        }
    }
});

// Handle sign out
if (signoutBtn) {
    signoutBtn.addEventListener('click', () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log('Sign-out successful.');
        }).catch((error) => {
            // An error happened.
            console.error('Sign-out error:', error);
        });
    });
}
