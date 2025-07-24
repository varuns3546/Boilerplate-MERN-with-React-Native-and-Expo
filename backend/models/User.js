import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator'
import Entry  from 'Entry.js'; 

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: validator.isEmail

  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  accountType: {
    type: String,
    enum: ['primary consultant', 'secondary consultant', 'client'],
    required: true
},
  isActive:{
    type: Boolean,
    default: true // true for active, false for inactive
  },
  entries: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Entry'
  }],
  refreshTokens: [{
    token: String,
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 604800 // 7 days
    }
  }]
}, {
  timestamps: true // adds createdAt and updatedAt
});

userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();
  
  try {
    // Hash password with cost of 12
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  if (!candidatePassword) return false;
  
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    return false;
  }
};

// Add refresh token
userSchema.methods.addRefreshToken = function(token) {
  this.refreshTokens.push({ token });
  return this.save();
};

// Remove refresh token
userSchema.methods.removeRefreshToken = function(token) {
  this.refreshTokens = this.refreshTokens.filter(t => t.token !== token);
  return this.save();
};

// Clean expired refresh tokens
userSchema.methods.cleanExpiredTokens = function() {
  this.refreshTokens = this.refreshTokens.filter(t => 
    t.createdAt.getTime() + (7 * 24 * 60 * 60 * 1000) > Date.now()
  );
  return this.save();
};

userSchema.index({ email: 1 });


const User = mongoose.model('User', userSchema);

export default User;
