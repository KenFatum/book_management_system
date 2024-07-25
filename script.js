const registerLink = document.querySelector(".register-link");
const loginLink = document.querySelector(".login-link");
const wrapperLogin = document.querySelector(".wrapper-login");
const wrapperRegister = document.querySelector(".wrapper-register");



registerLink.addEventListener("click", function() {
    wrapperLogin.classList.add("hidden");
    wrapperRegister.classList.remove("hidden");
})

loginLink.addEventListener("click", function() {
    wrapperRegister.classList.add("hidden");
    wrapperLogin.classList.remove("hidden");
})

function isValid(email, password) {
    if (!email || !password) {
        alert("Please fill all Fields.");
        return false;
    }
    return true;
}

// Funktion zum Hashen des Passworts
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedPassword = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashedPassword;
}

//Funktion zur Registierung
async function registerUser() {
    const registerEmail = document.querySelector('.wrapper-register input[class="input-email"]').value;
    const registerPassword = document.querySelector('.wrapper-register input[class="input-password"]').value;

    if (!isValid(registerEmail, registerPassword)) {
        return;
    }

    // Passwort hashen
    const hashedPassword = await hashPassword(registerPassword);

    //Daten für die API vorbereiten
    const userData = {
        email: registerEmail,
        password: hashedPassword
    };

    const apiEndpoint = 'http://localhost:3001/register';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    }

    fetch(apiEndpoint, options)
    .then(response => {
        if (!response.ok) {
            throw new Error('Netzwerkantwort war nicht ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Registrierung erfolgreich:', data);
        alert('Registrierung erfolgreich!');
        // Formular zurücksetzen
        document.querySelector('.wrapper-register form').reset();
    })
    .catch((error) => {
        console.error('Fehler bei der Registrierung:', error);
        alert('Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.');
    });
}