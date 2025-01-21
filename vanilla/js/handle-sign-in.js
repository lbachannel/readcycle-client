const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const usernameInput = $("#username");
const passwordInput = $("#password");

const escapseHTML = input => {
    const div = document.createElement('div');
    div.innerText = input.trim();
    return div.innerHTML;
}

$("#sign-in-btn").addEventListener("click", async (event) => {
    event.preventDefault();
    const username = escapseHTML(usernameInput.value.trim());
    const password = escapseHTML(passwordInput.value.trim());
    
    const data = {
        username,
        password
    }

    try {
        const response = await fetch("http://localhost:8080/api/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            window.location.href = "http://127.0.0.1:5500/index.html";
        } else {
            const error = await response.json();
            handleErrors(error.message);
        }
    } catch (error) {
        console.log(error);
    }
})

function handleErrors(messages) {
    const errorFields = $$(".error-message");
    errorFields.forEach((field) => (field.textContent = ""));
    if (Array.isArray(messages)) {
        messages.forEach((message) => {
            console.log(message)
            if (message.includes("username") || message.includes("Username") || message.includes("Invalid")) {
                $("#error-username").textContent = message;
            } else if (message.includes("Password") || message.includes("password")) {
                $("#error-password").textContent = message;
            }
        });
    } else {
        let arr = Array.of(messages);
        arr.forEach((message) => {
            console.log(message)
            if (message.includes("username") || message.includes("Username") || message.includes("Invalid")) {
                $("#error-username").textContent = message;
            } else if (message.includes("Password") || message.includes("password") || message.includes("credentials")) {
                $("#error-password").textContent = message;
            }
        });
    }
}

