const express = require('express');
const { getNotes, createNote, deleteNote, updateNote } = require('../container/notecontainer');
const auth = require('../middleWare/auth');

const noteRoute = express.Router();

noteRoute.get("/",auth,getNotes);

noteRoute.post("/",auth,createNote);

noteRoute.delete("/:id",auth,deleteNote);

noteRoute.put("/:id",auth,updateNote);

module.exports = noteRoute;


 