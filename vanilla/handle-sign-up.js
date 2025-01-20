const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const firtNameInput = $("#first-name");
const lastNameInput = $("#last-name");
const emailInput = $("#email");
const dateOfBirthInput = $("#birthday");
const passwordInput = $("#password");
const confirmPasswordInput = $("#confirm-password");

$("#sign-up-btn").addEventListener("click", async (event) => {
    event.preventDefault();
    const firstName = firtNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const email = emailInput.value.trim();
    const dateOfBirth = dateOfBirthInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    const data = {
        firstName, 
        lastName, 
        email, 
        password, 
        confirmPassword, 
        dateOfBirth
    };

    try {
        const response = await fetch("http://localhost:8080/api/v1/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            window.location.href = "http://127.0.0.1:5500/waiting-verify-email.html";
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
    messages.forEach((message) => {
        if (message.includes("First name")) {
            $("#error-first-name").textContent = message;
        } else if (message.includes("Last name")) {
            $("#error-last-name").textContent = message;
        } else if (message.includes("Email") || message.includes("Invalid email")) {
            $("#error-email").textContent = message;
        } else if (message.includes("Date of birth")) {
            $("#error-birthday").textContent = message;
        } else if (message.includes("Password") && !message.includes("Confirm") || message.includes("Incorrect")) {
            $("#error-password").textContent = message;
        } else if (message.includes("Confirm password")) {
            $("#error-confirm-password").textContent = message;
        }
    });
}