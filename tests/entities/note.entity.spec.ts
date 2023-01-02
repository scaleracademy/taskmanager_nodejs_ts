import { expect } from 'chai';
import { Note } from '../../src/entities/note.entity';


describe('Note Entity', () => {
  it ('should create a new note', () => {
    const note = new Note(1, 'Test Note', 'This is a test note');

    expect(note).to.be.an.instanceOf(Note);
    expect(note.id).to.equal(1);
    expect(note.content).to.equal('This is a test note');
  })
})