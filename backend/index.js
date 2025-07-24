import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

import entriesRoutes from './routes/entries.js'
import authRoutes from './routes/auth.js'

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors())
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded forms

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/entries', entriesRoutes);

const startServer = async() =>{
    try{
        console.log('Attempting to start server')

        mongoose.connect(process.env.MONGO_URI).then(() => {
            console.log('MongoDB connected');
            app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
        }).catch(err => {
            console.error('MongoDB connection error:', err);
        });
    }catch(error)
    {
        console.error('Failed to start server:', error);
        process.exit(1)
    }
}

startServer()

