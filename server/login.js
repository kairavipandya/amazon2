const User = require("./models/User");

function login(username, password) {
  if (!username || !password) {
    return "Please enter both username and password.";
  }
  console.log("Received login attempt:", username, password);

  return User.findOne({ username }).then(user => {
    console.log("🧠 Searching for user:", username);
    if (!user) {
      console.log("❌ User not found");
      return "Invalid credentials";
    }
  
    console.log("🔐 Found user in DB:", user);
    console.log("🔍 Comparing passwords:", user.password, "vs", password);
  
    if (user.password === password.trim()) {
      console.log("✅ Password match");
      return "Success";
    } else {
      console.log("❌ Password mismatch");
      return "Invalid credentials";
    }
  });  
}

module.exports = { login };
