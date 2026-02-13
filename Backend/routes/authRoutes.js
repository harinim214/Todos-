const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const router = express.Router()

// REGISTER
// REGISTER
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body
 if (!name || !email || !password) {
      return res.status(400).json({ message: "Enter all fields" })
    }

    // ✅ Remove extra spaces
    if (!name.trim() || !email.trim() || !password.trim()) {
      return res.status(400).json({ message: "Fields cannot be empty" })
    }
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" })
  }
 

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  })

  res.status(201).json({ message: "Registration successful" })
})

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body
 if (!email || !password) {
      return res.status(400).json({ message: "Enter email and password" })
    }
  const user = await User.findOne({ email })
  if (!user) {
    return res.status(400).json({ message: "Email not found" })
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return res.status(400).json({ message: "Incorrect password" })
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  )

  res.json({ token })
})


module.exports = router
