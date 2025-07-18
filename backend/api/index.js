// Railway deployment entry point
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("../config/db");

// Import the main app configuration
const app = express();

// Secure CORS Setup for Production
const allowedOrigins = [
  process.env.FRONTEND_URL, // Your deployed frontend URL
  'http://localhost:3000'     // For local development
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Import routes
const menuRoutes = require("../Routes/menuRoutes");
const fileRoutes = require("../Routes/PicRoutes");
const tableRoutes = require("../Routes/tableRoutes");
const roomRoutes = require("../Routes/roomRoutes");
const staffRoutes = require("../Routes/staffRoutes");
const shiftRoutes = require("../Routes/shiftroutes");
const AuthRouter = require("../Routes/AuthRouter");
const ProductRouter = require("../Routes/ProductRouter");
const GoogleRoutes = require("../Routes/GoogleRoutes");
const bookingRoutes = require("../Routes/bookingRoutes");
const orderRoutes = require("../Routes/orderRoutes");
const reservationRoutes = require("../Routes/ReservationRoutes");
const userRoutes = require("../Routes/UserRoutes");
const feedbackRoutes = require("../Routes/feedbackRoutes");
const adminRoutes = require('../Routes/AdminRoutes');
const paymentRoutes = require('../Routes/paymentRoutes');
const recommendationRoutes = require('../Routes/recommendationRoutes');

// Register Routes
app.use("/api/menus", menuRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/shift", shiftRoutes);
app.use("/auth", AuthRouter);
app.use("/api/products", ProductRouter);
app.use("/auth/google", GoogleRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/table-reservations", reservationRoutes);
app.use("/api/user", userRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/food-recommendations", recommendationRoutes);
app.use("/api/table-recommendations", tableRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    message: 'Railway backend is running'
  });
});

// API status endpoint
app.get('/api/status', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Hotel Management System API - Railway',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: 'production'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hotel Management System API',
    status: 'running',
    endpoints: {
      health: '/api/health',
      status: '/api/status'
    }
  });
});

// Start server for Railway
const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
