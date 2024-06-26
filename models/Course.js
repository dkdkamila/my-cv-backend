const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseTag: { type: String, required: true },
    courseTitle: { type: String, required: true },
    syllabus: { type: String, required: true },
    progression: { type: String, required: true },
    termin: { type: String, required: true }
});

module.exports = mongoose.model('Course', courseSchema);
