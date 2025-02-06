const express = require('express');
const router = express.Router();
const Authentication = require('../middleware/JWTauth');
const { ObjectId } = require('mongodb');

router.post('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const profile = await db.collection('profiles').findOne({ _id: new ObjectId(id) });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Failed to fetch profile.' });
  }
});

  
  module.exports = router;