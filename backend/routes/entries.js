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
    } catch (error){
        console.error('Error fetching entries:', error); // Add this line
        res.status(500).json({
            success: false,
            message: 'Failed to get entries'
        });
    }
    
})

router.get('/:id', async (req, res) => {
    try{
        const entry = await Entry.findById(req.params.id)
        res.json({
            success: true,
            entry: entry
        });
    } catch (error){
        console.error('Error fetching entry:', error); // Add this line
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

    const newEntry = new Entry({ title, content });
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
        const entry = await Entry.findOneAndDelete(req.params.id);
        res.json({
            success: true,
            entry: entry
        });
    } catch (error){
        console.error('Error fetching entry:', error); // Add this line
        res.status(500).json({
            success: false,
            message: 'Failed to get entry'
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

    const updatedEntry = await Entry.findByIdAndUpdate(
      req.params.id,
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