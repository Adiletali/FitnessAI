// Modal functionality
const modal = document.getElementById("modal");
const loginBtn = document.getElementById("loginBtn");
const getStartedBtns = document.querySelectorAll(".get-started-btn");
const closeModal = () => modal.style.display = "none";
const openModal = () => modal.style.display = "block";

// Open modal when clicking "Login" button
loginBtn.addEventListener("click", openModal);

// Toggle between login and register forms
const registerLink = document.getElementById("registerLink");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const loginLinkParagraph = document.getElementById("loginLinkParagraph");

registerLink.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.style.display = "none";
    registerForm.style.display = "block";
    loginLinkParagraph.style.display = "block";
});

// Smooth scroll for buttons
document.getElementById("scrollToPlansBtn").addEventListener("click", () => {
    document.getElementById("plans").scrollIntoView({ behavior: "smooth" });
});

// Show login form when "Login Here" is clicked
loginLinkParagraph.addEventListener("click", (e) => {
    e.preventDefault();
    registerForm.style.display = "none";
    loginForm.style.display = "block";
    loginLinkParagraph.style.display = "none";
});

// Close modal when clicking outside of the modal content
window.addEventListener("click", (e) => {
    if (e.target == modal) {
        closeModal();
    }
});

// AI Chat Functionality
async function fetchAIResponse(userMessage) {
    try {
        const response = await fetch('https://your-heroku-app-name.herokuapp.com/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userMessage })
        });

        const data = await response.json();
        addMessage('AI', data.response);
    } catch (error) {
        console.error('Error fetching AI response:', error);
    }
}

function addMessage(sender, message) {
    const msgDiv = document.createElement('div');
    msgDiv.textContent = `${sender}: ${message}`;
    document.getElementById('messages').appendChild(msgDiv);
}

// Send message when "Send" button is clicked
document.getElementById('sendBtn').addEventListener('click', () => {
    const userMessage = document.getElementById('userInput').value.trim();
    if (userMessage) {
        addMessage('User', userMessage);
        fetchAIResponse(userMessage);
        document.getElementById('userInput').value = '';
    }
});

// Show and hide chatbot functionality
document.getElementById('openChatBtn').addEventListener('click', () => {
    document.getElementById('chatbot').style.display = 'flex';
});

document.getElementById('closeChatBtn').addEventListener('click', () => {
    document.getElementById('chatbot').style.display = 'none';
});

// Other UI interaction code remains the same...
