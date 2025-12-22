// Profile Page JavaScript
const API_URL = 'http://localhost:3000/api';

// DOM Elements
const usernameDisplay = document.getElementById('usernameDisplay');
const profileUsername = document.getElementById('profileUsername');
const profileEmail = document.getElementById('profileEmail');
const memberSince = document.getElementById('memberSince');
const displayUsername = document.getElementById('displayUsername');
const displayEmail = document.getElementById('displayEmail');
const displayCreated = document.getElementById('displayCreated');
const accountAge = document.getElementById('accountAge');

const editProfileBtn = document.getElementById('editProfileBtn');
const profileDetails = document.getElementById('profileDetails');
const editProfileForm = document.getElementById('editProfileForm');
const updateProfileForm = document.getElementById('updateProfileForm');
const cancelEditBtn = document.getElementById('cancelEditBtn');

const changePasswordForm = document.getElementById('changePasswordForm');
const deleteAccountBtn = document.getElementById('deleteAccountBtn');
const deleteModal = document.getElementById('deleteModal');
const closeDeleteModal = document.getElementById('closeDeleteModal');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
const logoutBtn = document.getElementById('logoutBtn');

let currentUser = null;

// Check authentication and load user data
async function checkAuth() {
    try {
        const response = await fetch(`${API_URL}/auth/status`, {
            credentials: 'include'
        });
        const data = await response.json();

        if (!data.authenticated) {
            // Redirect to home if not logged in
            window.location.href = 'index.html';
            return;
        }

        currentUser = data.user;
        loadUserProfile(currentUser);
    } catch (error) {
        console.error('Auth check failed:', error);
        window.location.href = 'index.html';
    }
}

// Load user profile data
function loadUserProfile(user) {
    // Header
    usernameDisplay.textContent = user.username;
    profileUsername.textContent = user.username;
    profileEmail.textContent = user.email;

    // Details
    displayUsername.textContent = user.username;
    displayEmail.textContent = user.email;

    // Format dates
    if (user.created_at) {
        const createdDate = new Date(user.created_at);
        displayCreated.textContent = formatDate(createdDate);
        memberSince.textContent = formatDate(createdDate);

        // Calculate account age
        const now = new Date();
        const ageInDays = Math.floor((now - createdDate) / (1000 * 60 * 60 * 24));
        accountAge.textContent = ageInDays;
    }

    // Populate edit form
    document.getElementById('editUsername').value = user.username;
    document.getElementById('editEmail').value = user.email;
}

// Format date
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Show message
function showMessage(elementId, message, isError = false) {
    const messageEl = document.getElementById(elementId);
    messageEl.textContent = message;
    messageEl.className = isError ? 'message error' : 'message success';
    messageEl.style.display = 'block';
    
    setTimeout(() => {
        messageEl.style.display = 'none';
    }, 5000);
}

// Edit Profile Toggle
editProfileBtn?.addEventListener('click', () => {
    profileDetails.style.display = 'none';
    editProfileForm.style.display = 'block';
    editProfileBtn.style.display = 'none';
});

cancelEditBtn?.addEventListener('click', () => {
    profileDetails.style.display = 'block';
    editProfileForm.style.display = 'none';
    editProfileBtn.style.display = 'block';
    document.getElementById('updateMessage').style.display = 'none';
});

// Update Profile
updateProfileForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('editUsername').value;
    const email = document.getElementById('editEmail').value;

    try {
        const response = await fetch(`${API_URL}/update-profile`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ username, email })
        });

        const data = await response.json();

        if (data.success) {
            showMessage('updateMessage', 'Profile updated successfully!', false);
            currentUser.username = username;
            currentUser.email = email;
            loadUserProfile(currentUser);
            
            setTimeout(() => {
                profileDetails.style.display = 'block';
                editProfileForm.style.display = 'none';
                editProfileBtn.style.display = 'block';
            }, 2000);
        } else {
            showMessage('updateMessage', data.message, true);
        }
    } catch (error) {
        showMessage('updateMessage', 'Error updating profile', true);
        console.error('Update error:', error);
    }
});

// Change Password
changePasswordForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmNewPassword = document.getElementById('confirmNewPassword').value;

    if (newPassword !== confirmNewPassword) {
        showMessage('passwordMessage', 'New passwords do not match', true);
        return;
    }

    try {
        const response = await fetch(`${API_URL}/change-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ currentPassword, newPassword })
        });

        const data = await response.json();

        if (data.success) {
            showMessage('passwordMessage', 'Password changed successfully!', false);
            changePasswordForm.reset();
        } else {
            showMessage('passwordMessage', data.message, true);
        }
    } catch (error) {
        showMessage('passwordMessage', 'Error changing password', true);
        console.error('Password change error:', error);
    }
});

// Delete Account
deleteAccountBtn?.addEventListener('click', () => {
    deleteModal.style.display = 'block';
});

closeDeleteModal?.addEventListener('click', () => {
    deleteModal.style.display = 'none';
});

cancelDeleteBtn?.addEventListener('click', () => {
    deleteModal.style.display = 'none';
});

confirmDeleteBtn?.addEventListener('click', async () => {
    try {
        const response = await fetch(`${API_URL}/delete-account`, {
            method: 'DELETE',
            credentials: 'include'
        });

        const data = await response.json();

        if (data.success) {
            showMessage('deleteMessage', 'Account deleted. Redirecting...', false);
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } else {
            showMessage('deleteMessage', data.message, true);
        }
    } catch (error) {
        showMessage('deleteMessage', 'Error deleting account', true);
        console.error('Delete error:', error);
    }
});

// Logout
logoutBtn?.addEventListener('click', async () => {
    try {
        await fetch(`${API_URL}/logout`, {
            method: 'POST',
            credentials: 'include'
        });
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Logout error:', error);
        window.location.href = 'index.html';
    }
});

// Initialize
checkAuth();
