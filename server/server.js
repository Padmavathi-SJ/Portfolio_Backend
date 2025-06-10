import express from "express";
import cors from "cors";
import emailRoutes from "./routes/EmailRouter.js";

const app = express();

// CORS Configuration
const corsOptions = {
  origin: [
    'https://client-wgks.onrender.com',
    'http://localhost:3000' // For local testing
  ],
  optionsSuccessStatus: 200
}

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Routes - mounted at root level for testing
app.use("/", emailRoutes);
app.use("/api", emailRoutes); // Also available under /api

// Health Check Endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Backend is up and running!",
    timestamp: new Date().toISOString()
  });
});

// Deployment Confirmation Endpoint
app.get("/deployment-status", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Backend deployed successfully! 🚀",
    deploymentInfo: {
      environment: process.env.NODE_ENV || "development",
      port: process.env.PORT || 5000,
      corsEnabled: true,
      allowedOrigins: corsOptions.origin
    }
  });
});

// Root Endpoint
app.get("/", (req, res) => {
  res.send(`
    <h1>Portfolio Backend Service</h1>
    <p>Server is running successfully!</p>
    <ul>
      <li><a href="/health">Health Check</a></li>
      <li><a href="/deployment-status">Deployment Status</a></li>
      <li><a href="/api">API Routes</a></li>
    </ul>
    <p>Last updated: ${new Date().toLocaleString()}</p>
  `);
});

// Error Handling Middleware
app.use((req, res, next) => {
  res.status(404).json({ 
    error: "Route not found",
    availableRoutes: {
      root: "/",
      health: "/health",
      deploymentStatus: "/deployment-status",
      api: "/api"
    }
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: "Something went wrong!",
    message: err.message 
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`
  ===========================================
  🚀 Server running on port ${PORT}
  ===========================================
  Health Check: http://localhost:${PORT}/health
  Deployment Status: http://localhost:${PORT}/deployment-status
  API Base URL: http://localhost:${PORT}/api
  
  Backend successfully deployed and operational!
  `);
});