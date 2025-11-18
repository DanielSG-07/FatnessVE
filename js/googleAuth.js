// Function to handle the response from Google Sign-In
function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    // Decode the JWT to get user info
    const responsePayload = decodeJwtResponse(response.credential);
    console.log("ID: " + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    console.log('Given Name: ' + responsePayload.given_name);
    console.log('Family Name: ' + responsePayload.family_name);
    console.log("Image URL: " + responsePayload.picture);
    console.log("Email: " + responsePayload.email);

    // Store user data in localStorage for persistence
    localStorage.setItem('user', JSON.stringify(responsePayload));

    // Update UI
    updateUI(responsePayload);

    // Close the login modal after successful sign-in
    const loginModal = document.getElementById('login-modal');
    if (loginModal) {
        loginModal.style.display = 'none';
    }
}

// Function to decode the JWT response
function decodeJwtResponse(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

// Function to sign out the user
function signOut() {
    // Clear localStorage
    localStorage.removeItem('user');

    // Close profile modal if open
    const profileModal = document.getElementById('profile-modal');
    if (profileModal) {
        profileModal.style.display = 'none';
    }

    // Reset UI
    updateUI(null);
}

// Function to update the UI based on user state
function updateUI(user) {
    var signInButton = document.querySelector('.g_id_signin');
    var signOutButton = document.getElementById('signout-btn');
    var welcomeElement = document.getElementById('user-welcome');
    var userAvatar = document.getElementById('user-avatar');
    var loginIcon = document.getElementById('login-icon');

    if (user) {
        // User is signed in
        if (signInButton) signInButton.style.display = 'none';
        if (signOutButton) signOutButton.style.display = 'block';
        if (welcomeElement) {
            welcomeElement.textContent = 'Bienvenido ' + user.name;
        }
        if (userAvatar) {
            userAvatar.src = user.picture;
            // Add error handler to fall back to default image if Google picture fails
            userAvatar.onerror = function() {
                this.src = 'resourses/IconoBasico.png';
                this.onerror = null; // Prevent infinite loop
            };
        }
        if (loginIcon) {
            loginIcon.onclick = function() {
                openProfileModal(user);
            };
        }
    } else {
        // User is not signed in
        if (signInButton) signInButton.style.display = 'block';
        if (signOutButton) signOutButton.style.display = 'none';
        if (welcomeElement) {
            welcomeElement.textContent = '';
        }
        if (userAvatar) {
            userAvatar.src = 'resourses/IconoBasico.png';
            userAvatar.onerror = null; // Clear any previous error handler
        }
        if (loginIcon) {
            loginIcon.onclick = function() {
                openLoginModal();
            };
        }
    }
}

// Function to open the profile modal
function openProfileModal(user) {
    var profileModal = document.getElementById('profile-modal');
    var profileAvatar = document.getElementById('profile-avatar');
    var profileName = document.getElementById('profile-name');
    var profileEmail = document.getElementById('profile-email');
    var profileProvider = document.getElementById('profile-provider');

    if (profileAvatar) profileAvatar.src = user.picture;
    if (profileName) profileName.textContent = user.name;
    if (profileEmail) profileEmail.textContent = user.email;
    if (profileProvider) profileProvider.textContent = 'Google';

    if (profileModal) {
        profileModal.style.display = 'flex';
    }
}

// Function to open the login modal
function openLoginModal() {
    var loginModal = document.getElementById('login-modal');
    if (loginModal) {
        loginModal.style.display = 'flex';
    }
}

// Function to render Google Sign-In button
function renderGoogleButton() {
    const googleButtonContainer = document.querySelector('.g_id_signin');
    if (googleButtonContainer && typeof google !== 'undefined' && google.accounts && google.accounts.id) {
        // Clear any existing button
        googleButtonContainer.innerHTML = '';

        // Small delay to ensure container is ready
        setTimeout(() => {
            try {
                google.accounts.id.renderButton(
                    googleButtonContainer,
                    { theme: 'outline', size: 'large', width: 250 }
                );
            } catch (error) {
                console.log('Google button render failed, retrying...');
                // Retry after a longer delay
                setTimeout(() => {
                    google.accounts.id.renderButton(
                        googleButtonContainer,
                        { theme: 'outline', size: 'large', width: 250 }
                    );
                }, 500);
            }
        }, 100);
    }
}

// Initialize Google Sign-In when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check for existing user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        updateUI(JSON.parse(storedUser));
    } else {
        updateUI(null);
    }

    // Function to initialize Google Sign-In
    function initializeGoogleSignIn() {
        if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
            // Initialize Google Identity Services
            google.accounts.id.initialize({
                client_id: '75227419697-3biru3732ocv8o7uqo1r3r8vh261aemi.apps.googleusercontent.com',
                callback: handleCredentialResponse
            });

            // Render the Google Sign-In button on all pages
            renderGoogleButton();

        } else {
            // Retry after a short delay if Google API is not loaded yet
            setTimeout(initializeGoogleSignIn, 100);
        }
    }

    // Wait for Google script to load before initializing
    function waitForGoogleScript() {
        if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
            initializeGoogleSignIn();
        } else {
            setTimeout(waitForGoogleScript, 50);
        }
    }

    // Start waiting for script load
    waitForGoogleScript();

    // Attach sign-out button listener after everything is loaded
    const signOutButton = document.getElementById('signout-btn');
    if (signOutButton) {
        signOutButton.addEventListener('click', signOut);
    }
});
