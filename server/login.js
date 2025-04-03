//login.js

function isValidUsername(username) {
    if (typeof username !== "string") return false;
    return username.length > 4 && /^[a-zA-Z0-9]+$/.test(username);
}