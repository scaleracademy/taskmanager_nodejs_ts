import { Note } from '../entities/note.entity';

class TaskNoteHolder {
  notes: Note[] = [];
  private noteId: number = 1;
  public addNote(title: string, content: string): Note {
    const note = new Note(this.noteId++, title, content);
    this.notes.push(note);
    return note;
  }
}

class NotesRepository {
  private taskNoteMap: Map<number, TaskNoteHolder> = new Map();

  public getNotes(taskId: number): Note[] {
    const taskNoteHolder = this.taskNoteMap.get(taskId);
    if (taskNoteHolder) {
      return taskNoteHolder.notes;
    }
    return [];
  }

  public addNote(taskId: number, title: string, content: string): Note {
    if (!this.taskNoteMap.get(taskId)) {
      this.taskNoteMap.set(taskId, new TaskNoteHolder());
    }
    const taskNoteHolder = this.taskNoteMap.get(taskId)!!;
    return taskNoteHolder.addNote(title, content);
  }
}

export const notesRepo = new NotesRepository();