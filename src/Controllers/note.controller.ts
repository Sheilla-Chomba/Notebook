import mssql from "mssql";
import { Request, Response } from "express";
import { v4 } from "uuid";
import { Note } from "../Interfaces/note";
import { sqlConfig } from "../Config/sql.config";
 
const notes: Note[] = [];

function time(){
  const now = new Date();

  const year = String(now.getFullYear());
  const month = now.getMonth() + 1;
  const day = now.getDate();

  const currentDate= `${String(day).padStart(2, "0")}/${String(
    month
  ).padStart(2, "0")}/${year}`;

  const hours= now.getHours();
  const minutes = now.getMinutes();

  const formattedHours= String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");

  const currentTime = `${formattedHours}:${formattedMinutes}`;

  const createdAt= `Date:${currentDate}  Created Time: ${currentTime})`;

  return createdAt;
}


export const createNote = async (req: Request, res: Response) => {
  try {
    const id = v4();

    const { title, content }: Note = req.body;

    const pool = await mssql.connect(sqlConfig);

    let result = (
      await pool
        .request()
        .input("note_id", mssql.VarChar, id)
        .input("title", mssql.VarChar, title)
        .input("content", mssql.VarChar, content)
        .input("createdAt", mssql.VarChar, time())
        .execute("registerNote")
    ).rowsAffected;

    console.log(result);

    return res.json({
      message: "Note created successfully",
    });
  } catch (error) {
    return res.json({ error });
  }
};

export const getNotes = async (req: Request, res: Response) => {
  try {

    const pool = await mssql.connect(sqlConfig);
    let allNotes = (await pool.request().execute("getAllNotes")).recordset;

    return res.status(200).json({
      notes: allNotes,
    });

  } catch (error) {
    return res.json({ error });
  }
};

export const getOneNote = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

     const pool = await mssql.connect(sqlConfig);

     let note = (
       await pool.request().input("note_id", id).execute("getOneNote")
     ).recordset;

     return res.json({
       note,
     });
  } catch (error) {
    return res.json({ error });
  }
};

export const updateNote = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const { title, content }: Note = req.body;

    const pool = await mssql.connect(sqlConfig);

    let result = (
      await pool
        .request()
        .input("note_id", mssql.VarChar, id)
        .input("title", mssql.VarChar, title)
        .input("content", mssql.VarChar, content)
        .input("createdAt", mssql.VarChar, time())
        .execute("updateNote")
    ).rowsAffected;

    console.log(result);

    return res.status(200).json({
      message: "User updated successfully",
    });

  } catch (error) {
    return res.json({ error });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

     const pool = await mssql.connect(sqlConfig);

     let result = (
       await pool
         .request()
         .input("note_id", mssql.VarChar, id)
         .execute("deleteNote")
     ).rowsAffected;

     console.log(result[0]);

     if (result[0] == 0) {
       return res.status(201).json({
         error: "Note not found",
       });
     } else {
       return res.status(200).json({
         message: "Note deleted successfully",
       });
     }

  } catch (error) {
    return res.json({ error });
  }
};
