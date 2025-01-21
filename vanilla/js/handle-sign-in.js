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
            } else if (message.includes("Your account has not been verified")) {
                showWarrningToast(message);
            }
        });
    }
}

function toast({ title = '', message = '', type = 'info', duration = 3000 }) {
    const main = document.getElementById('toast-custom');
    if(main) {
        const toast = document.createElement('div');
        const autoRemoveId = setTimeout(function() {
            main.removeChild(toast);
        }, duration + 1000)
        toast.onclick = function(e) {
            if(e.target.closest('.toast-custom__close')) {
                main.removeChild(toast);
                clearTimeout(autoRemoveId);
            }
        };
        const icons = {
            success: 'fa fa-check-circle',
            info: 'fa fa-info',
            warning: 'fa fa-exclamation-triangle',
            error: 'fa fa-exclamation-circle',
        }
        const icon = icons[type];
        const delay = (duration / 1000).toFixed(2);
        toast.classList.add('toast-custom', `toast-custom--${type}`);
        toast.style.animation = `slideInLeft ease 0.3s, fadeOut linear 1s ${delay}s forwards`;
        toast.innerHTML = `
            <div class="toast-custom__icon">
                <i class="${icon}"></i>
            </div>
            <div class="toast-custom__body">
                <h3 class="toast-custom__title">${title}</h3>
                <p class="toast-custom__msg">${message}</p>
            </div>
            <div class="toast-custom__close">
                <i class="fa fa-times"></i>
            </div>
        `;
        main.appendChild(toast);
    }

}

function showWarrningToast(message) {
    toast(
        {title: 'Warning', message: message, type: 'warning', duration: 5000}
    );
};