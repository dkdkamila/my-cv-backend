const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// Hämta alla kurser
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching courses' });
    }
});

// Skapa en ny kurs
router.post('/', async (req, res) => {
    const { courseTag, courseTitle, syllabus, progression, termin } = req.body;

    if (!courseTag || !courseTitle || !syllabus || !progression || !termin) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const newCourse = new Course({ courseTag, courseTitle, syllabus, progression, termin });
        const savedCourse = await newCourse.save();
        res.status(201).json(savedCourse);
    } catch (error) {
        console.error('Error creating course', error.message);
        res.status(500).json({ error: 'Error creating course' });
    }
});

// Uppdatera en kurs
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { courseTag, courseTitle, syllabus, progression, termin } = req.body;

    if (!courseTag || !courseTitle || !syllabus || !progression || !termin) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const updatedCourse = await Course.findByIdAndUpdate(
            id,
            { courseTag, courseTitle, syllabus, progression, termin },
            { new: true }
        );
        res.json(updatedCourse);
    } catch (error) {
        console.error('Error updating course', error.message);
        res.status(500).json({ error: 'Error updating course' });
    }
});

// Ta bort en kurs
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCourse = await Course.findByIdAndDelete(id);
        res.status(204).json(deletedCourse);
    } catch (error) {
        console.error('Error deleting course', error.message);
        res.status(500).json({ error: 'Error deleting course' });
    }
});

module.exports = router;
