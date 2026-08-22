import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import cityRoutes from './routes/cityRoutes.js';
import tripRoutes from './routes/tripRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB gracefully (if running)
if (process.env.MONGODB_URI) {
  mongoose
    .connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 2000 })
    .then((conn) => {
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    })
    .catch((err) => {
      console.warn(`MongoDB not available locally (${err.message}). Using in-memory fallback store.`);
    });
}

// Middleware
app.use(
  cors({
    origin: true,
    credentials: true
  })
);
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/ai', aiRoutes);

// Base Route Healthcheck
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Globe Trotter API is active and ready',
    timestamp: new Date().toISOString()
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Globe Trotter Server running on port ${PORT}`);
});
