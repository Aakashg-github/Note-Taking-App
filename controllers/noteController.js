const { model } = require("mongoose");
const noteModel = require("../models/note");

const getNotes = async (req, res) => {
    try {
        // Use await to execute the query and get the array of URLs from the database.
        const notes = await noteModel.find({userId:req.userId}).exec();
        // console.log(notes);
        
        //console.log(req.body);

        // Pass the 'urls' array to the 'home' template when rendering.
        return res.render("note", { notes: notes });
    } catch (err) {
        // Handle any errors that may occur during the query or rendering process.
        console.error("Error while fetching notes from the database:", err);
        return res.status(500).send("Internal Server Error");
    }

}
const createNotes = async (req, res) => {

    const { note_title, note_content } = req.body;

    const newNote = new noteModel({
        title: note_title,
        discription: note_content,
        userId: req.userId
    });

    try {

        await newNote.save();
        // res.status(201).json(newNote);
        res.redirect('/note');

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }

}
const deleteNotes = async (req, res) => {
    const id = req.params.id;
    try {
        const note = await noteModel.findByIdAndRemove(id);
        res.status(202).json(note);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}
const updateNotes = async (req, res) => {
    const id = req.params.id;
    const { title, discription } = req.body;

    const newNote = {
        title: title,
        discription: discription,
        userId: req.userId
    }

    try {
        await noteModel.findByIdAndUpdate(id, newNote, { new: true });
        res.status(200).json(newNote);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

module.exports = {
    getNotes,
    createNotes,
    deleteNotes,
    updateNotes
}