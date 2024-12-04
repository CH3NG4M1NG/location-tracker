const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

let locations = [];

// Endpoint to receive location data
app.post('/savelocation', (req, res) => {
    const { latitude, longitude } = req.body;
    const timestamp = new Date();
    locations.push({ latitude, longitude, timestamp });
    res.send("Location saved successfully!");
});

// Endpoint to get location data
app.get('/getlocations', (req, res) => {
    res.json(locations);
});

// Default route to serve index.html for any other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
