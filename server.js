const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8000;

// Sets up Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Host our static files
app.use(express.static('public'))

// Get db.json as an object and return
app.get('/api/notes', (req, res) => {
    let data = JSON.parse(getStringFromFile('db/db.json'));
    res.json(data);
});

// Add new note
app.post('/api/notes', (req, res) => {
    let currentNotes = JSON.parse(getStringFromFile('db/db.json'));
    let newNote = req.body;

    // Give this note a unique id so it can be referenced later for deletion
    newNote.id = new Date().getTime();

    // Save our new notes list to our database
    currentNotes.push(newNote);
    writeStringToFile('db/db.json', JSON.stringify(currentNotes));

    res.json(newNote);
});

// Delete an existing note by id
app.delete('/api/notes/:id', (req, res) => {
    let currentNotes = JSON.parse(getStringFromFile('db/db.json'));
    let deleteID = req.params.id;
    let deletedElement = null;

    // Find the note to delete
    // Here, the deleteID is a string, while the element.id is an integer
    let index = currentNotes.findIndex(element => element.id === parseInt(deleteID));

    if (index != -1) {
        // Save the delete element
        deletedElement = currentNotes[index];

        currentNotes.splice(index, 1);

        // Save new notes list to database
        writeStringToFile('db/db.json', JSON.stringify(currentNotes));
    } else {
        return res.send('That is an invalid note id.');
    }

    // return the deleted element
    return res.json(deletedElement);
});

// Send notes.html for /notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

// Send index.html for the homepage
app.get('/', (req, res) => {
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