const express = require('express');
const multer = require('multer');
const { MongoClient } = require('mongodb');
const parseXML = require('../utils/parser');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), async (req, res) => {
  try {
    if(!db){
        res.status(202).json({message: 'Database not connected Properly'})
    }

    const filePath = req.file.path;
    const extractedData = await parseXML(filePath);

    const result = await db.collection('profiles').insertOne(extractedData);

    res.status(200).json({ message: 'File uploaded and data stored successfully!', data: extractedData });
    
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).json({ message: 'Failed to process file.' });
  }
});

module.exports = router;