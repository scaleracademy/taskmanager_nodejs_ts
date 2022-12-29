
export class Task {
  id: number;
  title: string;
  description: string;
  deadline: Date;
  completed: boolean;

  constructor(id: number, title: string, description: string, deadline: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.deadline = new Date(deadline); // TODO: validate the date string YYYY-MM-DD
    this.completed = false;
  }

  public setDeadline(deadline: string): void {
    this.deadline = new Date(deadline); // TODO: validate the date string YYYY-MM-DD
    // TODO: validate deadline is not in the past
  }
}