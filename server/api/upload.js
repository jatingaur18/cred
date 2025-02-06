const express = require('express');
const multer = require('multer');
const parseXML = require('../utils/parser');
const path = require('path');

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.xml') {
        req.fileValidationError = 'Only XML files are allowed';
        return cb(null, false);
    }
    cb(null, true);
};

const upload = multer({
    dest: 'uploads/',
    fileFilter
});

module.exports = function(db) {
    const router = express.Router();

    router.post('/', upload.single('file'), async (req, res) => {
        if (!db) {
            return res.status(202).json({ 
                message: 'Database not connected Properly' 
            });
        }

        try {
            if (req.fileValidationError) {
                return res.status(400).json({ 
                    message: req.fileValidationError 
                });
            }

            if (!req.file) {
                return res.status(400).json({ 
                    message: 'No file uploaded' 
                });
            }

            const filePath = req.file.path;
            const extractedData = await parseXML(filePath);
            
            const result = await db.collection('profiles').insertOne(extractedData);
            
            res.status(200).json({
                message: 'File uploaded and data stored successfully!',
                data: extractedData
            });
            
        } catch (error) {
            if (error.code === 121) {
                return res.status(400).json({
                    message: 'Invalid data format',
                    details: error.errInfo?.details || 'Schema validation failed'
                });
            }
            
            console.error('Error processing file:', error);
            res.status(500).json({ message: 'Failed to process file.' });
        }
    });

    return router;
};