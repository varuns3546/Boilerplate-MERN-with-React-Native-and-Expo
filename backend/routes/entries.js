import express from 'express';
import Entry from '../models/Entry.js';
import { authenticateToken } from '../middleware/auth.js';
const router = express.Router();

// Apply authentication to all routes
router.use(authenticateToken);

router.get('/', async (req, res) => {
    console.log('getting entries entries.js')
    try{
        // Only get entries for the authenticated user
        const entries = await Entry.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.json({
            success: true,
            entries: entries || []
        });
    } catch (error){
        console.error('Error fetching entries:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get entries'
        });
    }
})

router.get('/:id', async (req, res) => {
    try{
        // Only get entry if it belongs to the authenticated user
        const entry = await Entry.findOne({ _id: req.params.id, userId: req.user._id });
        
        if (!entry) {
            return res.status(404).json({
                success: false,
                message: 'Entry not found'
            });
        }
        
        res.json({
            success: true,
            entry: entry
        });
    } catch (error){
        console.error('Error fetching entry:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get entry'
        });
    }
})

router.post('/', async (req, res) => {
    try {
        const { title, content } = req.body;

        // Simple validation
        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: 'Title and content are required'
            });
        }

        // Create entry with user ownership
        const newEntry = new Entry({ 
            title, 
            content, 
            userId: req.user._id 
        });
        const savedEntry = await newEntry.save();

        res.status(201).json({
            success: true,
            entry: savedEntry
        });
    } catch (error) {
        console.error('Error creating entry:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create entry'
        });
    }
})


router.delete('/:id', async (req, res) => {
    try{
        // Only delete if entry belongs to authenticated user
        const entry = await Entry.findOneAndDelete({ 
            _id: req.params.id, 
            userId: req.user._id 
        });
        
        if (!entry) {
            return res.status(404).json({
                success: false,
                message: 'Entry not found'
            });
        }
        
        res.json({
            success: true,
            message: 'Entry deleted successfully',
            entry: entry
        });
    } catch (error){
        console.error('Error deleting entry:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete entry'
        });
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: 'Title and content are required'
            });
        }

        // Only update if entry belongs to authenticated user
        const updatedEntry = await Entry.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            { title, content },
            { new: true, runValidators: true }
        );

        if (!updatedEntry) {
            return res.status(404).json({
                success: false,
                message: 'Entry not found'
            });
        }

        res.json({
            success: true,
            entry: updatedEntry
        });
    } catch (error) {
        console.error('Error updating entry:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update entry'
        });
    }
});

export default router