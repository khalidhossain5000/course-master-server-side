import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.routes.js';
// Configure dotenv
dotenv.config();

const app = express()
const port = process.env.PORT || 5000;
// Middleware
app.use(cors());
app.use(express.json());
// Mount auth routes
app.use("/api/auth", authRoutes);
//mongoose connection
try {
    const db = await mongoose.connect(process.env.mongoDB_uri);
    console.log("MongoDB connected:", db.connection.host);
} catch (error) {
    console.error("MongoDB connection error:", error);
}

// Mount auth routes


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port} ${process.env.mongoDB_uri}`)
})
