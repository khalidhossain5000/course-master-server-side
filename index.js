import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.routes.js';
import courseRoutes from './routes/course.route.js'
import instructorRoutes from './routes/instructor.routes.js'
import cookieParser from 'cookie-parser';
// Configure dotenv
dotenv.config();

const app = express()
const port = process.env.PORT || 5000;
// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true, 
  })
);

app.use(express.json());
app.use(cookieParser());
// Mount auth routes
app.use("/api/auth", authRoutes);

//create courses
app.use("/api/courses", courseRoutes);

//instrcurots
app.use("/api/instructors", instructorRoutes);

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
