const express = require('express');
const path = require('path');

const app = express();
const PORT = 8000;

// Sets up Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../index.html'));
});

app.listen(PORT, function() {
    console.log(`Listening on http://localhost:${PORT}`);
});