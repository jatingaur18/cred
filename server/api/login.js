const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');  // Updated to use bcryptjs

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

router.post('/', async (req, res) => {
  if (!db) {
    return res.status(500).json({ message: "Database not connected" });
  }
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const usersCollection = db.collection('users');
    const foundUser = await usersCollection.findOne({ email });

    if (!foundUser) {
      return res.status(401).json({ message: "User not found" });
    }
    const isPasswordCorrect = bcrypt.compareSync(password, foundUser.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { email: foundUser.email, password: foundUser.password }, 
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    const { password: _, ...userWithoutPassword } = foundUser;
    res.status(200).json({ message: "Login successful", user: userWithoutPassword, token });    
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
