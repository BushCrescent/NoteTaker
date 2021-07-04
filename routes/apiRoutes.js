const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

router.get("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname,"../db/db.json"), "utf8", (err, data) => {
        if (err) throw err;
        
        res.json(JSON.parse(data));
    });
});

router.post("/api/notes", (req, res) => {
    
    const newNote = req.body;
    newNote.id = uuidv4();

    console.log("req.body", req.body);
    
    //read
    return fs.readFile(path.join(__dirname,"../db/db.json"), "utf8", (err, data) => {
        if (err) throw err;
        
        //update notes
        const allNotes = JSON.parse(data);
        allNotes.push(newNote);

        //write it back
        fs.writeFile(path.join(__dirname,"../db/db.json"), JSON.stringify(allNotes),"utf8",() => {
            res.json({
                success: true,
                newNote: newNote
            });
        });
    });
});


router.delete("/api/notes/:id", (req, res) => {
    //get the id to dleete from params
    const id = req.params.id;
    //readFile
    return fs.readFile(path.join(__dirname,"../db/db.json"), "utf8", (err, data) => {
        if (err) throw err;
        //delete the entry by id
        const allNotes = JSON.parse(data);
        const filteredNotes = allNotes.filter((note) => note.id !== id);
        //write it back
        fs.writeFile(path.join(__dirname,"../db/db.json"), JSON.stringify(filteredNotes),"utf8",() => {
            res.json({
                success: true,
                id: id
            });
        });
    });
});

module.exports = router;