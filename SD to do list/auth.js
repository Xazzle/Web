
const users = JSON.parse(localStorage.getItem('users')) || [];
function loginUser(event) {
    event.preventDefault();

    const username = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;

    if (validateLogin(username, password)) {
        localStorage.setItem('username', username); // Store the username in sessionStorag
        localStorage.setItem('loggedInUser', username); // Store username in localStorage
        closeLoginModal();
        window.location.href = "tasks.html"; // Redirect to the tasks page
    } else {
        document.getElementById('loginError').textContent = "Invalid username or password.";
    }
}

function displayUser(username) {
    const userNameDisplay = document.getElementById('userName');
    if (userNameDisplay) { // Only set if element exists
        userNameDisplay.textContent = `Welcome, ${username}`;
    } else {
        console.error("Element with id 'userName' not found in the DOM.");
    }

    const exitLink = document.getElementById('exitLink');
    const loginLink = document.getElementById('loginLink');
    const registerLink = document.getElementById('registerLink');

    if (exitLink && loginLink && registerLink) {
        exitLink.style.display = 'block';
        loginLink.style.display = 'none';
        registerLink.style.display = 'none';
    }
}
// Function to delete a user from localStorage
function deleteUser(username) {
    const index = users.findIndex(user => user.username === username);
    if (index > -1) {
        users.splice(index, 1); // Remove user from array
        localStorage.setItem('users', JSON.stringify(users)); // Update localStorage
        populateUserTable(); // Refresh user table
    }
}

// Function to display the logged-in user's name and update the UI
function displayUser(username) {
    const userNameDisplay = document.getElementById('userName');
    const exitLink = document.getElementById('exitLink');
    const loginLink = document.getElementById('loginLink');
    const registerLink = document.getElementById('registerLink');

    userNameDisplay.textContent = username; // Show username
    exitLink.style.display = 'block'; // Show exit link
    loginLink.style.display = 'none'; // Hide login link
    registerLink.style.display = 'none'; // Hide register link

    // Update navbar visibility
    const navbarNav = document.querySelector('.navbar-nav');
    navbarNav.classList.remove('d-none');
    navbarNav.classList.add('d-flex');
}

// Function to handle login
function handleLogin(event) {
    event.preventDefault(); // Prevent default form submission
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    console.log(`Attempting to log in with username: ${username}`); // Debugging log
        const registeredUser = users.find(user => user.username === username && user.password === password);
        if (registeredUser) {
            localStorage.setItem('loggedInUser', username); // Store registered user login
            displayUser(username);
            bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
            console.log("User logged in successfully."); // Log success
        } else {
            document.getElementById('loginError').textContent = 'Invalid username or password';
            console.error('Invalid login attempt'); // Debugging log
        }
    }

// Function to handle registration
function handleRegistration(event) {
    event.preventDefault(); // Prevent default form submission
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    if (!users.some(user => user.username === username)) {
        users.push({ username, password }); // Add new user
        localStorage.setItem('users', JSON.stringify(users)); // Update localStorage
        bootstrap.Modal.getInstance(document.getElementById('registerModal')).hide();
        alert('Registration successful! You can now log in.'); // Notify user
    } else {
        document.getElementById('registerError').textContent = 'Username already exists'; // Error message
    }
}

// Function to check if the user is logged in on page load
function checkLogin() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        displayUser(loggedInUser); // Display user if logged in
    }
}
    

// Add exit link functionality
document.getElementById('exitLink').onclick = function() {
    localStorage.removeItem('loggedInUser'); // Clear login on logout
    handleExit();
};

function handleExit() {
    const userNameDisplay = document.getElementById('userName');
    const exitLink = document.getElementById('exitLink');
    const loginLink = document.getElementById('loginLink');
    const registerLink = document.getElementById('registerLink');

    if (userNameDisplay) userNameDisplay.textContent = '';
    if (exitLink) exitLink.style.display = 'none'; // Hide exit link
    if (loginLink) loginLink.style.display = 'block'; // Show login link
    if (registerLink) registerLink.style.display = 'block'; // Show register link

    const navbarNav = document.querySelector('.navbar-nav');
    if (navbarNav) {
        navbarNav.classList.add('d-none');
        navbarNav.classList.remove('d-flex');
    }
}


// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Attach event listeners to the forms
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('registerForm').addEventListener('submit', handleRegistration);
});
