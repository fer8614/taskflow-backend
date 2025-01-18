import type { Request, Response } from "express";
import Note, { INote } from "../models/Note";

export class NoteController {
  static createNote = async (req: Request<{}, {}, INote>, res: Response) => {
    const { content } = req.body;
  };
}
