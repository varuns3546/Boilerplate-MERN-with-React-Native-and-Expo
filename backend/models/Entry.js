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
  }
}, {
  timestamps: true // adds createdAt and updatedAt
});

const Entry = mongoose.model('Entry', entrySchema);

export default Entry;
