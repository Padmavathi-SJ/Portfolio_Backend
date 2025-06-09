import express from "express";
import cors from "cors";
import emailRoutes from "./routes/EmailRouter.js";

const app = express();

const corsOptions = {
  origin: 'https://client-wgks.onrender.com',
  optionsSuccessStatus: 200
}

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Routes
app.use("/api", emailRoutes);

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
      allowedOrigin: corsOptions.origin
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

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`
  ===========================================
  🚀 Server running on port ${PORT}
  ===========================================
  Health Check: http://localhost:${PORT}/health
  Deployment Status: http://localhost:${PORT}/deployment-status
  
  Backend successfully deployed and operational!
  `);
});