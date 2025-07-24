import mongoose from 'mongoose';

const entrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true // Index for efficient queries
  }
}, {
  timestamps: true // adds createdAt and updatedAt
});

const Entry = mongoose.model('Entry', entrySchema);

export default Entry;
