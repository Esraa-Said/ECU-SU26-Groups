const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');

router.post('/upload-profile', upload.single('profileImage'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a file' });
        }
        res.status(200).json({
            message: 'Image uploaded successfully',
            filePath: `/uploads/${req.file.filename}`
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;