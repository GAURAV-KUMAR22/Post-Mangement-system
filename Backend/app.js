import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
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


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

dotenv.config();

const app = express();
// set secure method
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
}));
// compression file

app.use(compression({
    level: 6, // Best balance between speed & compression
    filter: (req, res) => {
        if (req.headers['x-no-compression']) return false;
        return compression.filter(req, res);
    }
}))

// Database Connection
DbConnection()
// connection;
app.use(statusMonitor())
// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

// CORS middleware with dynamic origin check for production


const allowedOrigins = [
    process.env.FRONTEND_BASE_URL, // Use frontend URL from .env file
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true, // Allow cookies (if needed)
    })
);



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
