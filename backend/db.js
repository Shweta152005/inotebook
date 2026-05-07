const mongoose = require('mongoose');
const path = require('path');

// Always load ONLY backend/.env when running locally
if (process.env.NODE_ENV !== "production") {
  require('dotenv').config({ path: path.join(__dirname, '.env') });
}

const mongoURI = process.env.MONGO_URI;

const connectToMongo = async () => {
  if (!mongoURI) {
    console.error("❌ MONGO_URI is missing! Check backend/.env or Render env vars");
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoURI, {
      dbName: "inotebook",
    });
    console.log("✅ Connected to MongoDB successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectToMongo;








