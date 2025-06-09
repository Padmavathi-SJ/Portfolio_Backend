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

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
