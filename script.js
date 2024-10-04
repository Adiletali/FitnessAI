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
const loginLinkParagraph = document.getElementById("loginLinkParagraph"); // For toggling back to login

// Show registration form when "Register Here" is clicked
registerLink.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default link behavior
    loginForm.style.display = "none"; // Hide login form
    registerForm.style.display = "block"; // Show registration form
    loginLinkParagraph.style.display = "block"; // Show the link to login
});
// Smooth scroll for the "Get Our Plans" button
document.getElementById("scrollToPlansBtn").addEventListener("click", () => {
    document.getElementById("plans").scrollIntoView({ behavior: "smooth" });
});
// Smooth scroll for the "Join Now" button
document.getElementById("joinNowBtn").addEventListener("click", () => {
    document.getElementById("welcomeSection").scrollIntoView({ behavior: "smooth" });
});

// Show login form when "Login Here" is clicked
loginLinkParagraph.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default link behavior
    registerForm.style.display = "none"; // Hide registration form
    loginForm.style.display = "block"; // Show login form
    loginLinkParagraph.style.display = "none"; // Hide the login link
});

// Close modal when clicking outside of the modal content
window.addEventListener("click", (e) => {
    if (e.target == modal) {
        closeModal();
    }
});

// Smooth scroll for header buttons
document.getElementById("featuresBtn").addEventListener("click", () => {
    document.getElementById("featuresSection").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("aboutBtn").addEventListener("click", () => {
    document.getElementById("aboutSection").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("contactBtn").addEventListener("click", () => {
    document.getElementById("contactSection").scrollIntoView({ behavior: "smooth" });
});

// Open modal when clicking "Get Started" buttons
getStartedBtns.forEach(button => {
    button.addEventListener("click", openModal);
});

// Close Modal Functionality
const closeModalButton = document.getElementById("closeModal");
if (closeModalButton) {
    closeModalButton.addEventListener("click", closeModal);
}
// Hiding header on scroll
let lastScrollTop = 0; // Variable to store the last scroll position
const header = document.querySelector("header"); // Get the header element

window.addEventListener("scroll", function() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop; // Get current scroll position

    if (currentScroll > lastScrollTop) {
        // Scroll Down
        header.style.transform = "translateY(-100%)"; // Adjust this value based on your header height
    } else {
        // Scroll Up
        header.style.transform = "translateY(0)"; // Show the header
    }
    lastScrollTop = currentScroll; // Update last scroll position
}); 

// Открытие и закрытие чата
document.getElementById('openChatBtn').addEventListener('click', () => {
    document.getElementById('chatbot').classList.add('active');
});

document.getElementById('closeChatBtn').addEventListener('click', () => {
    document.getElementById('chatbot').classList.remove('active');
});

// Добавление сообщений в чат
function addMessage(sender, message) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message');
    msgDiv.classList.add(sender === 'User' ? 'user-message' : 'ai-message');
    msgDiv.textContent = message;
    document.getElementById('messages').appendChild(msgDiv);
    document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
}

// Обработчик отправки сообщения
document.getElementById('sendBtn').addEventListener('click', () => {
    const userMessage = document.getElementById('userInput').value.trim();
    if (userMessage) {
        addMessage('User', userMessage);  // Добавляем сообщение пользователя
        fetchAIResponse(userMessage);     // Отправляем сообщение ассистенту
        document.getElementById('userInput').value = '';  // Очищаем поле ввода
    }
});

// Эмуляция ответа ассистента
async function fetchAIResponse(userMessage) {
    // Добавить реальный вызов API для получения ответа от OpenAI
    setTimeout(() => {
        const aiResponse = `Ответ на вопрос: "${userMessage}"`; // Здесь можно заменить на реальный ответ от OpenAI
        addMessage('AI', aiResponse); // Добавляем ответ ассистента
    }, 1000); // Эмуляция задержки ответа
}

async function fetchAIResponse(userMessage) {
    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userMessage })
        });
        const data = await response.json();
        addMessage('AI', data.response);
    } catch (error) {
        addMessage('AI', 'Произошла ошибка при получении ответа.');
    }
}
