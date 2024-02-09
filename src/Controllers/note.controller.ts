import { Request, Response } from "express";
import {v4} from 'uuid'
import { Note } from "../Interfaces/note";

const notes: Note[] = []


export const createNote = async(req: Request, res: Response)=>{
    try {
        const id = v4()

        const {title, content,createdAt }:Note = req.body

        const newNote = {note_id:id, title,content,createdAt}

        notes.push(newNote)

        return res.json({
            message: "Note created successfully",
            note: newNote
        })

    } catch (error) {
        return res.json({error})
    }
}

export const getNotes = async (req: Request, res: Response) => {
  try {
    return res.json({
      notes: notes
    });
  } catch (error) {
    return res.json({ error });
  }
};

export const getOneNote = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const singleNote = notes.filter((note) => note.note_id == id);

    return res.json({
      singleNote
    });
  } catch (error) {
    return res.json({ error });
  }
};

export const updateNote = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const { title, content, createdAt }: Note = req.body;

    const updatedNote = { note_id: id, title, content, createdAt };

    const note_index = notes.findIndex((note) => note.note_id == id);

    if (note_index < 0) {
      return res.json({
        message: "Note not found",
      });
    } else {
      notes[note_index] = updatedNote;
      return res.json({
        message: "Note updated successfully",
        updatedNote,
      });
    }
  } catch (error) {
    return res.json({ error });
  }
};

export const deleteNote = async(req: Request, res: Response)=>{
    try {
        const id = req.params.id

        let note_index = notes.findIndex(note=> note.note_id == id)

        if(note_index < 0){
            return res.json({
                message: 'Note not found'
            })
        }else{
            notes.splice(note_index, 1)
            return res.json({
                message: "Note deleted successfully"
            })
        }
    } catch (error) {
        return res.json({error})
    }
}