// register.js

// IMPORTANT: Make sure this URL is correct!
const BACKEND_URL = "https://ai-crypto-app-backend.onrender.com";

// Get references to the HTML elements
const usernameInput = document.getElementById("usernameInput");
const passwordInput = document.getElementById("passwordInput");
const registerButton = document.getElementById("registerButton");
const messageSection = document.getElementById("message");
const messageText = document.getElementById("messageText");

// This function will be called when the button is clicked
async function handleRegister() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
        showMessage("Username and password are required.", "error");
        return;
    }

    registerButton.disabled = true;
    registerButton.textContent = "Registering...";
    
    try {
        // Send the registration data to our backend's /register endpoint
        const response = await fetch(`${BACKEND_URL}/register`, {
            method: 'POST', // Use POST method for sending data
            headers: {
                'Content-Type': 'application/json' // Tell the server we're sending JSON
            },
            body: JSON.stringify({ // Convert the JS object to a JSON string
                username: username,
                password: password
            })
        });

        const data = await response.json();

        // Check if the server responded with an error status code
        if (!response.ok) {
            throw new Error(data.error || "An unknown error occurred.");
        }

        // If successful, show a success message
        showMessage(data.message, "success");

    } catch (error) {
        // If any error happened, show the error message
        console.error("Registration error:", error);
        showMessage(error.message, "error");
    } finally {
        // This runs no matter what
        registerButton.disabled = false;
        registerButton.textContent = "Register";
    }
}

// A helper function to display messages
function showMessage(message, type) {
    messageText.textContent = message;
    // Change color based on success or error
    messageSection.style.backgroundColor = type === "success" ? "#1a4d2e" : "#5d1a21";
    messageSection.style.color = type === "success" ? "#d1e7dd" : "#f8d7da";
    messageSection.classList.remove("hidden");
}

// Add event listener to the button
registerButton.addEventListener("click", handleRegister);