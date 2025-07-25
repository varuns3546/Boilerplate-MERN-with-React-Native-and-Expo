import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import Entry from '../models/entryModel.js';
import User from '../models/userModel.js';

const getEntries = asyncHandler(async (req, res) => {
    console.log('getting entries entries.js')
    try{
        const entries = await Entry.find({user: req.user._id})
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

const getEntry = asyncHandler(async (req, res) => {
    try{
        const user = await User.findById(req.user._id)
        if(!user){
            res.status(401)
            throw new Error('User not found')
        }
        if(entry.user.toString() !== user._id){
            res.status(401)
            throw new Error('User not authorized')
        }
        const entry = await Entry.findById(req.params.id);
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

const createEntry = asyncHandler(async (req, res) => {
    console.log(req.body)

    try {
        const { title, content } = req.body;

        // Simple validation
        if (!title || !content) {
        return res.status(400).json({
            success: false,
            message: 'Title and content are required'
        });
        }

        const newEntry = new Entry({
            title,
            content,
            user: req.user._id
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


const deleteEntry = asyncHandler(async (req, res) => {
    try{
        const user = await User.findById(req.user._id)
        if(!user){
            res.status(401)
            throw new Error('User not found')
        }
        if(entry.user.toString() !== user._id){
            res.status(401)
            throw new Error('User not authorized')
        }
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

const updateEntry = asyncHandler(async (req, res) => {
    try {
        const entry = await Entry.findById(req.params.id)
        if(!entry){
            res.status(404)
            throw new Error('Entry not found')
        }
        if(!req.user){
            res.status(401)
            throw new Error('User not found')
        }
        if(entry.user.toString() !== req.user._id){
            res.status(401)
            throw new Error('User not authorized')
        }

        const user = await User.findById(req.user._id)
        if(!user){
            res.status(401)
            throw new Error('User not found')
        }

        if(entry.user.toString() !== user._id){
            res.status(401)
            throw new Error('User not authorized')
        }
        const updatedEntry = await Entry.findByIdAndUpdate
        (req.params.id, req.body, {
            new: true,
        })

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

export default{ 
    getEntries,
    getEntry,
    createEntry,
    deleteEntry,
    updateEntry
}