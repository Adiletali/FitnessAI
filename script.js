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

require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

// Function to handle sending the user's message to the backend
async function fetchAIResponse(userMessage) {
    try {
      const response = await fetch('https://your-heroku-app-name.herokuapp.com/chat', {
        method: 'POST', // Using POST because you're sending data
        headers: {
          'Content-Type': 'application/json' // Indicate the data is in JSON format
        },
        body: JSON.stringify({ message: userMessage }) // Send the user's message
      });
  
      // Parse the JSON response from the backend
      const data = await response.json();
      
      // Assuming 'data.response' contains the AI's reply
      console.log('AI Response:', data.response);
      addMessage('AI', data.response); // Function to display the AI's response in the chat
    } catch (error) {
      console.error('Error fetching AI response:', error);
    }
  }
  
  // Function to add messages to the chat
  function addMessage(sender, message) {
    const msgDiv = document.createElement('div');
    msgDiv.textContent = `${sender}: ${message}`;
    document.getElementById('messages').appendChild(msgDiv);
  }
  
  // Example usage: Call fetchAIResponse when the user sends a message
  document.getElementById('sendBtn').addEventListener('click', () => {
    const userMessage = document.getElementById('userInput').value.trim();
    if (userMessage) {
      addMessage('User', userMessage); // Add the user's message to the chat
      fetchAIResponse(userMessage); // Send the message to the backend and get AI response
      document.getElementById('userInput').value = ''; // Clear the input field
    }
  });
  