import { Task } from '../entities/task.entity';

export interface TaskFilter {
  completed?: boolean;
}

class TaskRepository {
  private tasks: Task[] = [];
  private taskId: number = 1;

  public getAllTasks(filter?: TaskFilter): Task[] {
    let tasks = this.tasks;
    if (filter) {
      if (filter.completed !== undefined) {
        tasks = tasks.filter(task => task.completed === filter.completed);
      }
    }
    return tasks;
  }

  public getTaskById(id: number): Task | undefined {
    return this.tasks.find(task => task.id === id);
  }

  public createTask(title: string, description: string, deadline: string): Task {
    const task = new Task(this.taskId++, title, description, deadline);
    this.tasks.push(task);
    return task;
  }

  public updateTask(id: number, title: string, description: string, deadline: string, completed: boolean): Task | undefined {
    const task = this.getTaskById(id);
    if (!task) return undefined;
    
    if (title) task.title = title;
    if (description) task.description = description;
    if (deadline) task.setDeadline(deadline);
    if (completed !== undefined) task.completed = completed;
    return task;
  }

}

/**
 * Export a singleton instance of [TaskRepository]
 */
export const taskRepo = new TaskRepository();