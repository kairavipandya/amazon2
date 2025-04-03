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
    try {
        if (username ===  null || password === null) throw new Error("Null input");
        if (username === undefined || password === undefined) throw new Error("Undefined input");

        if (!isValidUsername(username)) return "Error";
        if (!isValidPassword(password)) return "Error";
        return "Success";
    } catch (error) {
        return "Excpetion";
    }
}

//test cases

const username = {
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
    ["Valid", "Exception", "Exception"],
    ["Invalid", "Valid", "Error"],
    ["Invalid", "Invalid", "Error"],
    ["Invalid", "Exception", "Exception"],
    ["Exception", "Valid", "Exception"],
    ["Exception", "Invalid", "Exception"],
    ["Exception", "Exception", "Exception"]
  ];
  
  console.log("=== LOGIN TEST CASES ===");
  testCases.forEach(([uType, pType, expected], index) => {
    const result = login(usernames[uType], passwords[pType]);
    const status = result === expected ? "PASS" : "FAIL";
    console.log(`Test ${index + 1}: Username=${uType}, Password=${pType} → Expected=${expected}, Got=${result} → ${status}`);
  });