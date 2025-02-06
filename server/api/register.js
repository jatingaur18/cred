const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const SALT_ROUNDS = 10;

router.post('/', async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ message: "Email, username, and password are required." });
  }

  try {
    const usersCollection = db.collection('users');

    const existingUser = await usersCollection.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      const conflictField = existingUser.email === email ? 'Email' : 'Username';
      return res.status(409).json({ message: `${conflictField} already exists` });
    }
    const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);

    const newUser = { email, username, password: hashedPassword };
    await usersCollection.insertOne(newUser);

    const token = jwt.sign(
      { email, password },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({ message: "Signup successful", token });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
