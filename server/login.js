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

function login(username, password) {
    if (!isValidUsername(username)) return "Error";
    if (!isValidPassword(password)) return "Error";
    return "Success";
}

module.exports = { login };
//test cases

const usernames = {
    Valid: "johnty25",
    Invalid: "jo",
    Exception: null
};

const passwords = {
    Valid: "Ilovepickles68!",
    Invalid: "ihatepi",
    Exception: undefined
};

const testCases = [
    ["Valid", "Valid", "Success"],
    ["Valid", "Invalid", "Error"],
    ["Valid", "Exception", "Error"],
    ["Invalid", "Valid", "Error"],
    ["Invalid", "Invalid", "Error"],
    ["Invalid", "Exception", "Error"],
    ["Exception", "Valid", "Error"],
    ["Exception", "Invalid", "Error"],
    ["Exception", "Exception", "Error"]
  ];
  
  console.log("=== LOGIN TEST CASES ===");
  testCases.forEach(([uType, pType, expected], index) => {
    const result = login(usernames[uType], passwords[pType]);
    const status = String(result) === String(expected) ? "PASS" : "FAIL";
    console.log(`Test ${index + 1}: Username=${uType}, Password=${pType} → Expected=${expected}, Got=${result} → ${status}`);
  });