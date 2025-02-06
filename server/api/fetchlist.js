const express = require('express');
const router = express.Router();
const Authentication = require('../middleware/JWTauth');


router.post('/' ,async (req, res) => {
    try {
        // if(req.user.username !== req.body.user.username){
        //     res.status(505).json({ message: 'tocken Failure' });
        // }
      const profiles = await db.collection('profiles').find({}, { projection: { basicDetails: 1 } }).toArray();
      const formattedProfiles = profiles.map(profile => ({
        _id: profile._id,
        basicDetails: profile.basicDetails
      }));
  
      res.status(200).json(formattedProfiles);
    } catch (error) {
      console.error('Error fetching profiles:', error);
      res.status(500).json({ message: 'Failed to fetch profiles.' });
    }
  });
  
  module.exports = router;