import { expect } from 'chai';
import { taskRepo } from '../../src/repositories/task.repository';
import { Task } from 'src/entities/task.entity';


describe("Task Repository", () => {
  it('should have 0 tasks in the beginning', () => {
    expect(taskRepo.getAllTasks()).to.have.lengthOf(0);
  })

  it('should create a new task', () => {
    const task = taskRepo.createTask('Test Task', 'This is a test task', '2021-01-01');
    expect(task).to.be.instanceOf(Task)
    expect(task.id).to.equal(1);
    expect(task.title).to.equal('Test Task');
    expect(task.description).to.equal('This is a test task');
    expect(task.deadline.getTime()).to.equal(new Date('2021-01-01').getTime());
    expect(task.completed).to.be.false;

    expect(taskRepo.getAllTasks()).to.have.lengthOf(1);
  })
});
