import express from 'express';
// import http from 'http';
import AuthRoute from './Router/Auth.route.js'
import PostsRoute from './Router/Post.route.js'
import DbConnection from './Db/Db.mongo.js'
import cors from 'cors'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import statusMonitor from 'express-status-monitor';
import path from 'path'
import { fileURLToPath } from "url";

// Get the __dirname equivalent in ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();

// Database Connection
DbConnection()
// connection;
app.use(statusMonitor())
// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

// CORS middleware with dynamic origin check for production
app.use(cors({
    origin: process.env.FRONTEND_BASE_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

// serve static file
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use('/api/auth', AuthRoute);
app.use('/api', PostsRoute);


// Error-handling middleware (catch all)
app.use((err, req, res, next) => {
    console.error(err.stack);
    return res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
