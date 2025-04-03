//logout.js

function logout(logoutClicked, confirmationClicked) {
    if (logoutClicked === "Valid" && confirmationClicked === "Valid") {
        return "Logout confirmation page";
    }

    if (logoutClicked === "Valid" && confirmationClicked === "Invalid") {
        return "Profile Dashboard page";
    }

    if (
        logoutClicked === "Invalid" ||
        logoutClicked === "Exception" ||
        confirmationClicked === "Invalid" ||
        confirmationClicked === "Exception"
    ) {
        return "Error Message";
    }

    return "Unknown";
}

//test cases

const testCases = [
    ["Valid", "Valid", "Logout confirmation page"],     
    ["Valid", "Invalid", "Profile Dashboard page"],     
    ["Invalid", "Valid", "Error Message"],              
    ["Invalid", "Invalid", "Error Message"],            
    ["Valid", "Exception", "Error Message"],            
    ["Invalid", "Exception", "Error Message"]           
  ];
  
  console.log("=== LOGOUT TEST CASES ===");
  testCases.forEach(([logoutBtn, confirmBtn, expected], index) => {
    const result = logout(logoutBtn, confirmBtn);
    const status = String(result) === String(expected) ? "PASS" : "FAIL";
    console.log(`Test ${index + 1}: Logout=${logoutBtn}, Confirm=${confirmBtn} → Expected=${expected}, Got=${result} → ${status}`);
  });