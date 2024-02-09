import { Router } from "express";
import { createNote, deleteNote, getOneNote, getNotes, updateNote } from "../Controllers/note.controller";

const noteRouter = Router()

noteRouter.post('/', createNote)
noteRouter.get('/', getNotes)
noteRouter.put('/update/:id', updateNote)
noteRouter.get('/:id', getOneNote)
noteRouter.delete('/delete/:id', deleteNote)

export default noteRouter