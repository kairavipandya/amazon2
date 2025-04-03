//logout.js

function logout(logoutClicked, confirmationClicked) {
    if (logoutClicked === "Valid" && confirmationClicked === "Valid") {
        return "Logout confirmation page";
    }

    if (logoutClicked === "Valid" && confirmationClicked === "Invalid") {
        return "Profile Dashboard page";
    }
}