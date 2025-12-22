// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Auth.js DOM loaded');
    
    // Auth Modal Elements
    const authModal = document.getElementById('authModal');
    const loginBtn = document.getElementById('loginBtn');
    const closeAuthModal = document.querySelector('.close');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    const userProfile = document.getElementById('userProfile');
    const userInfo = document.getElementById('userInfo');
    const logoutBtn = document.getElementById('logoutBtn');
    const usernameDisplay = document.getElementById('usernameDisplay');

    console.log('Login button found:', !!loginBtn);

    const API_URL = 'http://localhost:3000/api';

    // Flag to track if profile handler is attached
    let profileHandlerAttached = false;

    // Modal Controls
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            console.log('Login button clicked');
            if (authModal) {
                authModal.style.display = 'block';
                showLoginForm();
            }
        });
    }

    if (closeAuthModal) {
        closeAuthModal.addEventListener('click', () => {
            if (authModal) {
                authModal.style.display = 'none';
                clearForms();
            }
        });
    }

    window.addEventListener('click', (e) => {
        if (authModal && e.target === authModal) {
            authModal.style.display = 'none';
            clearForms();
        }
    });

    if (showRegister) {
        showRegister.addEventListener('click', (e) => {
            e.preventDefault();
            showRegisterForm();
        });
    }

    if (showLogin) {
        showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            showLoginForm();
        });
    }

    function showLoginForm() {
        if (loginForm) loginForm.style.display = 'block';
        if (registerForm) registerForm.style.display = 'none';
        clearMessages();
    }

    function showRegisterForm() {
        if (loginForm) loginForm.style.display = 'none';
        if (registerForm) registerForm.style.display = 'block';
        clearMessages();
    }

    function clearForms() {
        const loginFormEl = document.getElementById('loginFormElement');
        const registerFormEl = document.getElementById('registerFormElement');
        if (loginFormEl) loginFormEl.reset();
        if (registerFormEl) registerFormEl.reset();
        clearMessages();
    }

    function clearMessages() {
        const loginMsg = document.getElementById('loginMessage');
        const registerMsg = document.getElementById('registerMessage');
        if (loginMsg) {
            loginMsg.textContent = '';
            loginMsg.className = 'message';
        }
        if (registerMsg) {
            registerMsg.textContent = '';
            registerMsg.className = 'message';
        }
    }

    function showMessage(elementId, message, isError = false) {
        const messageEl = document.getElementById(elementId);
        if (messageEl) {
            messageEl.textContent = message;
            messageEl.className = isError ? 'message error' : 'message success';
        }
    }

    // Login Handler
    const loginFormElement = document.getElementById('loginFormElement');
    if (loginFormElement) {
        loginFormElement.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;

            try {
                const response = await fetch(`${API_URL}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({ username, password })
                });

                const data = await response.json();

                if (data.success) {
                    showMessage('loginMessage', 'Login successful!', false);
                    setTimeout(() => {
                        authModal.style.display = 'none';
                        updateUIForLoggedInUser(data.user);
                        clearForms();
                    }, 1000);
                } else {
                    showMessage('loginMessage', data.message, true);
                }
            } catch (error) {
                showMessage('loginMessage', 'Error connecting to server. Make sure the server is running.', true);
                console.error('Login error:', error);
            }
        });
    }

    // Register Handler
    const registerFormElement = document.getElementById('registerFormElement');
    if (registerFormElement) {
        registerFormElement.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const username = document.getElementById('registerUsername').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('registerConfirmPassword').value;

            // Validate passwords match
            if (password !== confirmPassword) {
                showMessage('registerMessage', 'Passwords do not match', true);
                return;
            }

            try {
                const response = await fetch(`${API_URL}/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({ username, email, password })
                });

                const data = await response.json();

                if (data.success) {
                    showMessage('registerMessage', 'Registration successful! Logging you in...', false);
                    setTimeout(() => {
                        authModal.style.display = 'none';
                        updateUIForLoggedInUser(data.user);
                        clearForms();
                    }, 1000);
                } else {
                    showMessage('registerMessage', data.message, true);
                }
            } catch (error) {
                showMessage('registerMessage', 'Error connecting to server. Make sure the server is running.', true);
                console.error('Registration error:', error);
            }
        });
    }

    // Direct event handler for username click -> navigate to profile
    if (userInfo) {
        userInfo.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            window.location.href = 'profile.html';
        }, true);
        userInfo.style.cursor = 'pointer';
    }

    // Direct event handler for logout button -> logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            
            try {
                const response = await fetch(`${API_URL}/logout`, {
                    method: 'POST',
                    credentials: 'include'
                });

                const data = await response.json();

                if (data.success) {
                    updateUIForLoggedOutUser();
                }
            } catch (error) {
                console.error('Logout error:', error);
                updateUIForLoggedOutUser();
            }
        }, true);
    }

    // UI Update Functions
    function updateUIForLoggedInUser(user) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (userProfile) userProfile.style.display = 'flex';
        if (usernameDisplay) usernameDisplay.textContent = user.username;
    }

    function updateUIForLoggedOutUser() {
        if (loginBtn) loginBtn.style.display = 'block';
        if (userProfile) userProfile.style.display = 'none';
        if (usernameDisplay) usernameDisplay.textContent = '';
    }

    // Check authentication status on page load
    async function checkAuthStatus() {
        try {
            const response = await fetch(`${API_URL}/auth/status`, {
                credentials: 'include'
            });

            const data = await response.json();

            if (data.authenticated && data.user) {
                updateUIForLoggedInUser(data.user);
            } else {
                updateUIForLoggedOutUser();
            }
        } catch (error) {
            console.error('Error checking auth status:', error);
            updateUIForLoggedOutUser();
        }
    }

    // Check auth status when page loads
    checkAuthStatus();
});
