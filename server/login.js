//login.js

function isValidUsername(username) {
    if (typeof username !== "string") return false;
    return username.length > 4 && /^[a-zA-Z0-9]+$/.test(username);
}

function isValidPassword(password) {
    if (typeof password !== "string") return false;
    if (password.length <=8) return false;

    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return hasUpper && hasLower && hasDigit && hasSpecial;
}