const express = require('express');

module.exports = function(db) {
  const router = express.Router();

  router.get('/', async (req, res) => {
    try {
      const profiles = await db.collection('profiles')
        .find({})
        .toArray();

      if (!profiles || profiles.length === 0) {
        return res.status(200).json([]);
      }

      res.status(200).json(profiles);
    } catch (error) {
      console.error('Error fetching profiles:', error);
      res.status(500).json({ message: 'Failed to fetch profiles.' });
    }
  });

  return router;
};