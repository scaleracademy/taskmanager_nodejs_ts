import { Router } from 'express';
import { TaskFilter, taskRepo } from '../repositories/task.repository';
import { notesRepo } from '../repositories/note.repository';

const route = Router();

/**
 * GET /api/tasks
 * @summary Get all tasks
 */
route.get('/', (req, res) => {
  const filter: TaskFilter = {
    completed: req.query.completed === 'true' ? true : req.query.completed === 'false' ? false : undefined
  };
  
  res.status(200).json(taskRepo.getAllTasks(filter))
})

/**
 * POST /api/tasks
 * @summary Create a new task
 */
route.post('/', (req, res) => {
  const { title, description, deadline } = req.body; // TODO: validate the request body
  const task = taskRepo.createTask(title, description, deadline);
  
  res.status(201).json(task);
})

/**
 * GET /api/tasks/:id
 * @summary Get a task by id
 */
route.get('/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  if (isNaN(taskId)) {
    res.status(404).json({ error: 'Invalid task id' });
    return;
  }
  const task = taskRepo.getTaskById(taskId);
  if (!task) {
    res.status(404).json({ error: 'Task not found' });
    return;
  }
  const notes = notesRepo.getNotes(taskId);
  task.notes = notes;
  res.status(200).json(task);
})

route.patch('/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  if (isNaN(taskId)) {
    res.status(404).json({ error: 'Invalid task id' });
    return;
  }

  const { title, description, deadline, completed } = req.body; // TODO: validate the request body
  const task = taskRepo.updateTask(taskId, title, description, deadline, completed);
  if (!task) {
    res.status(404).json({ error: 'Task not found & not updated' });
    return;
  }

  res.status(202).json(task);
})

export const taskRoute = route;