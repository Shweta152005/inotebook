const mongoose = require("mongoose");
require("dotenv").config(); // loads .env

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected successfully to MongoDB");
    process.exit(0);
  } catch (err) {
    console.error("❌ Connection failed:", err.message);
    process.exit(1);
  }
})();
