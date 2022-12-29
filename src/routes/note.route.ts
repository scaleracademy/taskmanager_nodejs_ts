import { Router } from "express";
import { notesRepo } from "../repositories/note.repository";
import { taskRepo } from '../repositories/task.repository';

const route = Router();

route.get("/:taskId/notes", (req, res) => {
  const taskId = parseInt((req.params as any).taskId);
  if (isNaN(taskId)) {
    res.status(404).json({ error: "Invalid task id" });
    return;
  }
  const task = taskRepo.getTaskById(taskId);
  if (!task) {
    res.status(404).json({ error: "Task not found" });
    return;
  }
  const notes = notesRepo.getNotes(taskId);
  res.status(200).json(notes);
});

route.post("/:taskId/notes", (req, res) => {
  const taskId = parseInt((req.params as any).taskId);
  if (isNaN(taskId)) {
    res.status(404).json({ error: "Invalid task id" });
    return;
  }
  const task = taskRepo.getTaskById(taskId);
  if (!task) {
    res.status(404).json({ error: "Task not found" });
    return;
  }
  const { title, content } = req.body; // TODO: validate the request body
  const note = notesRepo.addNote(taskId, title, content);
  res.status(201).json({ taskId, note });
});

export const notesRoute = route;
