import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Get the environment variables
const PORT = process.env.PORT || 5003;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRE = process.env.JWT_EXPIRE;

// Check if essential environment variables are defined
if (!MONGO_URI) {
  console.error('MongoDB URI is undefined. Please set MONGO_URI in your environment variables.');
  process.exit(1);
}

if (!JWT_SECRET) {
  console.error('JWT Secret is undefined. Please set JWT_SECRET in your environment variables.');
  process.exit(1);
}

if (!JWT_EXPIRE) {
  console.warn('JWT Expiration time is not defined. Defaulting to 1h.');
}

// Initialize the express app
const app = express();

// Connect to MongoDB using mongoose
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');

    // Log the PORT for debugging
    console.log(`PORT: ${PORT}`);

    // Start the server after MongoDB connection
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err);
  });

// Middleware and Routes here
