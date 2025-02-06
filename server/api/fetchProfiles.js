const express = require('express');
const { ObjectId } = require('mongodb');


module.exports = function(db){
  const router = express.Router();

  router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
    
      const profile = await db.collection('profiles').findOne({ _id: new ObjectId(id) });
    
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
    
      res.status(200).json({
        ...profile,
        _id: profile._id  
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({ message: 'Failed to fetch profile.' });
    }
  });
  return router
}
