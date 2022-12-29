import { Task } from '../entities/task.entity';

class TaskRepository {
  private tasks: Task[] = [];
  private taskId: number = 1;

  public getAllTasks(): Task[] {
    return this.tasks;
  }

  public getTaskById(id: number): Task | undefined {
    return this.tasks.find(task => task.id === id);
  }

  public createTask(title: string, description: string, deadline: string): Task {
    const task = new Task(this.taskId++, title, description, deadline);
    this.tasks.push(task);
    return task;
  }

}

/**
 * Export a singleton instance of [TaskRepository]
 */
export const taskRepo = new TaskRepository();