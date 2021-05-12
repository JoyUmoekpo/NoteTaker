const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');

module.exports = app => {

    // Setup notes variable
    fs.readFile("db/db.json", "utf8", (err, data) => {

        if (err) throw err;

        var notes = JSON.parse(data);

        // API ROUTES
        // ========================================================

        // Setup the /api/notes get route
        app.get('/api/notes', (req, res) => {
            const dbPath = path.resolve(__dirname, '../db/db.json')
            const note = JSON.parse(fs.readFileSync(dbPath))
            res.json(note)
        });

        // Setup the /api/notes post route
        app.post('/api/notes', (req, res) => {
            const dbPath = path.resolve(__dirname, '../db/db.json')
            const note = JSON.parse(fs.readFileSync(dbPath))
            req.body['id'] = uuid();
            note.push(req.body);
            fs.writeFileSync(dbPath, JSON.stringify(note));
            res.json(note);
    
        });

        // Retrieves a note with specific id
        app.get("/api/notes/:id", function (req, res) {
            // display json for the notes array indices of the provided id
            res.json(notes[req.params.id]);
        });

        // Deletes a note with specific id
        app.delete('/api/notes/:id', (req, res) => {
            const dbPath = path.resolve(__dirname, '../db/db.json')
            const note = JSON.parse(fs.readFileSync(dbPath))
            const deleteID = req.params.id;
            const newNote = []
            for (let i = 0; i < note.length; i++) {
                if (deleteID !== note[i].id) {
                    newNote.push(note[i])
                }
            }
            fs.writeFileSync(dbPath, JSON.stringify(newNote))
            res.send('deleted')

        })

        // VIEW ROUTES
        // ========================================================

        // Display notes.html when /notes is accessed
        app.get('/notes', function (req, res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });

        // Display index.html when all other routes are accessed
        app.get('*', function (req, res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

        //updates the json file whenever a note is added or deleted
        function updateDb() {
            fs.writeFile("db/db.json", JSON.stringify(notes, '\t'), err => {
                if (err) throw err;
                return true;
            });
        }

    });

}