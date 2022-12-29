import { Router } from 'express';
import { taskRepo } from '../repositories/task.repository';

const route = Router();

route.get('/', (req, res) => {
  res.status(200).json(taskRepo.getAllTasks())
})

route.post('/', (req, res) => {
  const { title, description, deadline } = req.body; // TODO: validate the request body
  const task = taskRepo.createTask(title, description, deadline);
  
  res.status(201).json(task);
})

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
  res.status(200).json(task);
})

export const taskRoute = route;