const express = require('express');
const { getNotes, createNotes, deleteNotes, updateNotes } = require('../controllers/noteController');
const auth = require('../middlewares/auth');
const noteRouter = express.Router();

noteRouter.get("/",auth,getNotes);

noteRouter.post("/",auth,createNotes);

noteRouter.delete("/:id",auth,deleteNotes);

noteRouter.put("/:id",auth,updateNotes);

module.exports = noteRouter;