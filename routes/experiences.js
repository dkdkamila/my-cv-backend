const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');

// Hämta all erfarenhet
router.get('/', async (req, res) => {
    try {
        const experiences = await Experience.find();
        res.json(experiences);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching experiences' });
    }
});

// Skapa en ny erfarenhet
router.post('/', async (req, res) => {
    const { title, company, description, startDate, endDate } = req.body;

    if (!title || !company || !description || !startDate) {
        return res.status(400).json({ error: 'Title, company, description and start date are required' });
    }

    try {
        const newExperience = new Experience({ title, company, description, startDate, endDate });
        const savedExperience = await newExperience.save();
        res.status(201).json(savedExperience);
    } catch (error) {
        console.error('Error creating experience', error.message);
        res.status(500).json({ error: 'Error creating experience' });
    }
});

// Uppdatera en erfarenhet
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, company, description, startDate, endDate } = req.body;

    if (!title || !company || !description || !startDate) {
        return res.status(400).json({ error: 'Title, company, description and start date are required' });
    }

    try {
        const updatedExperience = await Experience.findByIdAndUpdate(
            id,
            { title, company, description, startDate, endDate },
            { new: true }
        );
        res.json(updatedExperience);
    } catch (error) {
        console.error('Error updating experience', error.message);
        res.status(500).json({ error: 'Error updating experience' });
    }
});

// Ta bort en erfarenhet
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedExperience = await Experience.findByIdAndDelete(id);
        res.status(204).json(deletedExperience);
    } catch (error) {
        console.error('Error deleting experience', error.message);
        res.status(500).json({ error: 'Error deleting experience' });
    }
});

module.exports = router;
