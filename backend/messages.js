const express = require('express');
const router = express.Router();
const fs = require('fs').promises; // Import fs.promises to use async file operation

router.get('/', async (req, res, next) => {
    try {
        const data = await fs.readFile('./messages.json', 'utf8');
        const messages = JSON.parse(data);
        res.json(messages);
    } catch (error) {
        res.status(500).json({
            error: 'Error reading messages from file!'
        });
    }
});

router.post('/add', async (req, res) => {
    try {
        const data = await fs.readFile('./messages.json', 'utf8');
        const messages = JSON.parse(data);

        const newMessageJson = JSON.parse(req.query.message);

        messages.messages.push(newMessageJson);

        await fs.writeFile('./messages.json', JSON.stringify(messages, null, 2));
        
        res.json({ 
            message: 'Message added successfully',
            messages
        });
    } catch (error) {
        res.status(500).json({ 
            error: 'Error adding message!' 
        });
    }
});

module.exports = router;