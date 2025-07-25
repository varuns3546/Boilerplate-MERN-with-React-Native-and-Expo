import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const registerUser = asyncHandler(async (req, res) => {
    const {firstName, lastName, email, password, orgPassword} = req.body

    if(!firstName || !lastName || !email || !password || !orgPassword){
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if user exists
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        accountType: 'client'
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            accountType: user.accountType
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }

    
})
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    // Check for user email
    const user = await User.findOne({email})
    if(!user){
        res.status(400)
        throw new Error('User not found')
    }

    // Check password
    if (user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            accountType: user.accountType
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
    
    res.json({message: 'Login'})


})

const getUser = asyncHandler(async (req, res) => {
    res.json({message: 'Get user data'})
})

export default {
    registerUser,
    loginUser,
    getUser
}