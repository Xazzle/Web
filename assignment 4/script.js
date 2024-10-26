document.querySelector('form').addEventListener('submit', function (event) {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !message) {
        alert('Please fill in all fields');
        event.preventDefault();
    } else {
        alert('Form submitted successfully!');
    }
});
const users = [];
function login(username, password) {
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        alert('Login successful!');
    } else {
        alert('Invalid username or password');
    }
}
function register(username, password) {
    const userExists = users.some(user => user.username === username);
    if (userExists) {
        alert('User already exists');
    } else {
        users.push({ username, password });
        alert('Registration successful!');
    }
}
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    item.addEventListener('click', () => {
        const answer = item.querySelector('.answer');
         answer.classList.toggle('d-none');
        if (answer.style.display === 'none' || !answer.style.display) {
            answer.style.display = 'block';
        } else {
            answer.style.display = 'none';
        }
    });
});
function showPopup() {
    const popup = document.createElement('div');
    popup.innerHTML = `
        <div class="popup-overlay">
            <div class="popup">
                <h3>Subscribe to our Newsletter</h3>
                <input type="email" placeholder="Enter your email" id="subscribe-email">
                <button id="subscribe-btn">Subscribe</button>
                <button id="close-popup">Close</button>
            </div>
        </div>
    `;
    document.body.appendChild(popup);
    document.getElementById('close-popup').addEventListener('click', () => {
        document.body.removeChild(popup);
    });
    document.getElementById('subscribe-btn').addEventListener('click', () => {
        const email = document.getElementById('subscribe-email').value;
        if (email) {
            alert('Thanks for subscribing!');
            document.body.removeChild(popup);
        } else {
            alert('Please enter a valid email');
        }
    });
}
setTimeout(showPopup, 5000);
const toggleThemeBtn = document.createElement('button');
toggleThemeBtn.textContent = 'Dark/Light Theme';
document.body.appendChild(toggleThemeBtn);

toggleThemeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});
function displayTime() {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    document.getElementById('current-time').innerHTML = `Date: ${date}, Time: ${time}`;
}
setInterval(displayTime, 1000); 

const style = document.createElement('style');
style.innerHTML = `
    .dark-theme {
        background-color: #121212;
        color: white;
    }
    
    .popup-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .popup {
        background: white;
        padding: 20px;
        border-radius: 10px;
    }
    
    .faq-item .answer {
        display: none;
    }
    
    .d-none {
        display: none;
    }
`;
document.head.appendChild(style);
