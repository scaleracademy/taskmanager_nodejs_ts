import { expect } from 'chai';
import { taskRepo } from '../../src/repositories/task.repository';


describe("Task Repository", () => {
  it('should have 0 tasks in the beginning', () => {
    expect(taskRepo.getAllTasks()).to.have.lengthOf(0);
  })
});
