import {MIN_PASSWORD_LENGTH} from "./constants.js";
import {showInfoLabel} from "./core.js";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX = new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@.#$!%*?&])[A-Za-z\\d@.#$!%*?&]{${MIN_PASSWORD_LENGTH},}$`);


export function validateLogin() {
    let valid = true;

    const form = document.forms["login"];

    const usernameField = form["username"];
    if (usernameField == null) {
        console.error("validateLogin: Could not find username field in login form");
        valid = false;
    }
    const passwordField = form["password"];
    if (passwordField == null) {
        console.error("validateLogin: Could not find password field in login form")
        valid = false;
    }

    showInfoLabel(usernameField, "", "info", false);
    showInfoLabel(passwordField, "", "info", false);

    const username = usernameField.value.trim();
    if (username.length <= 0) {
        showInfoLabel(usernameField, "Benutzername darf nicht leer sein.", "error", true);
        valid = false;
    }
    const password = passwordField.value.trim();
    if (password.length < MIN_PASSWORD_LENGTH) {
        showInfoLabel(passwordField, `Passwort muss mindestens ${MIN_PASSWORD_LENGTH} Zeichen lang sein.`, "error", true);
        valid = false;
    }

    return valid;
}

export function validateRegister() {
    let valid = true;

    const form = document.forms["register"];

    const usernameField = form["username"];
    if (usernameField == null) {
        console.error("validateLogin: Could not find username field in login form");
        valid = false;
    }
    const emailField = form["email"];
    if (emailField == null) {
        console.error("validateLogin: Could not find email field in login form");
        valid = false;
    }
    const passwordField = form["password"];
    if (passwordField == null) {
        console.error("validateLogin: Could not find password field in login form")
        valid = false;
    }

    showInfoLabel(usernameField, "", "info", false);
    showInfoLabel(emailField, "", "info", false);
    showInfoLabel(passwordField, "", "info", false);

    const username = usernameField.value.trim();
    if (username.length <= 0) {
        showInfoLabel(usernameField, "Benutzername darf nicht leer sein.", "error", true);
        valid = false;
    }
    const email = emailField.value.trim();
    if (email.length <= 0) {
        showInfoLabel(emailField, "E-Mail darf nicht leer sein.", "error", true);
        valid = false;
    }
    if (email.length > 0 && !EMAIL_REGEX.test(email)) {
        showInfoLabel(emailField, "E-Mail entspricht keinem gültigen format.", "error", true);
        valid = false;
    }
    const password = passwordField.value.trim();
    if (password.length < MIN_PASSWORD_LENGTH) {
        showInfoLabel(passwordField, `Passwort muss mindestens ${MIN_PASSWORD_LENGTH} Zeichen lang sein.`, "error", true);
        valid = false;
    }
    if (password.length >= MIN_PASSWORD_LENGTH && !PASSWORD_REGEX.test(password)) {
        showInfoLabel(passwordField, "Passwort muss mindestens einen Großbuchstaben, einen Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten.", "error", true);
        valid = false;
    }

    return valid;
}