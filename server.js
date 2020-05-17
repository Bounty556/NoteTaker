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
    let data = JSON.parse(getStringFromFile('db/db.json'));
    res.json(data);
});

// Add new note
app.post('/api/notes', (req, res) => {
    let currentNotes = JSON.parse(getStringFromFile('db/db.json'));
    let newNote = req.body;

    currentNotes.push(newNote);
    writeStringToFile('db/db.json', JSON.stringify(currentNotes));

    res.json(newNote);
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

function writeStringToFile(filePath, data) {
    fs.writeFile(path.join(__dirname, filePath), data, (err) => {
        if (err) throw err;
    });
}