require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
app.use(helmet());
app.use(cors());
const port = process.env.PORT || 3001;

// Anslut till MongoDB 
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });

app.use(bodyParser.json());

// Använd kursrutter
const courseRoutes = require('./routes/courses');
app.use('/api/courses', courseRoutes);

// Använd erfarenhetsrutter
const experienceRoutes = require('./routes/experiences');
app.use('/api/experiences', experienceRoutes);

// Starta servern
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
