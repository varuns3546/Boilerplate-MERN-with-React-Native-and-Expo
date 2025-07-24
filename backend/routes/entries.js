import express from 'express';
import Entry from '../models/Entry.js';
const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const entries = await Entry.find()
        res.json({
            success: true,
            entries: entries || []
        });
    }catch (error){
        res.status(500).json({
            success: false,
            message: 'Failed to get entries'
        });
    }
    
})

export default router