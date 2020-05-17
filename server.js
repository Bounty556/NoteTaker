const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 8000;

// Sets up Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Get db.json as an object and return
app.get('/api/notes', (req, res) => {
    let data = getStringFromFile('db/db.json');
    res.json(JSON.parse(data));
});

// Send notes.html for /notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

// Send index.html for the homepage
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, function() {
    console.log(`Listening on http://localhost:${PORT}`);
});

function getStringFromFile(filePath) {
    return fs.readFileSync(path.join(__dirname, filePath), 'utf-8');
}