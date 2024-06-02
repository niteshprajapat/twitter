import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import tweetRoutes from './routes/tweetRoutes.js';


// Connections
dotenv.config();
connectDB();

// Variables
const app = express();
const port = process.env.PORT || 5000;


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}))

// Routes Middlewares
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/tweet', tweetRoutes);


// Home Page Route
app.get('/', (req, res) => {
    return res.status(200).json({
        success: true,
        message: 'This is Home Page of Twitter',
    });
});


// App Listen
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
