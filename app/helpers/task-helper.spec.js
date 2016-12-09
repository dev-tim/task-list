import {swapTaskPositions, zipTasksByTaskId} from './task-helper';
import {expect} from 'chai';

describe('Task helper', () => {
  describe('when calling swapTaskPositions', () => {
    it('should swap 2 task positions with valid indxes', () => {
      expect(swapTaskPositions([1, 2, 3], 0, 2)).to.deep.equal([3, 2, 1]);
    });

    it('should not swap 2 task positions if first index is out of range', () => {
      expect(swapTaskPositions([1, 2, 3], 5, 2)).to.deep.equal([1, 2, 3]);
    });

    it('should not swap 2 task positions if secord index is out of range', () => {
      expect(swapTaskPositions([1, 2, 3], 1, 44)).to.deep.equal([1, 2, 3]);
    });
  });

  describe('when calling zipTasksByTaskId', () => {

    it('should zip tasks by task it',  () => {
      const rawTasks = [{id: 1, value: 'first'}, {id: 2, value: 'second'}];
      expect(zipTasksByTaskId(rawTasks)).to.deep.equal({
        [1]: {id: 1, value: 'first'},
        [2]: {id: 2, value: 'second'},
      })
    });

    it('should override task with the same id',  () => {
      const rawTasks = [{id: 1, value: 'first'}, {id: 2, value: 'second'}, {id: 2, value: 'third'}];
      expect(zipTasksByTaskId(rawTasks)).to.deep.equal({
        [1]: {id: 1, value: 'first'},
        [2]: {id: 2, value: 'third'},
      })
    });

    it('should return empty object, when recieved amy list',  () => {
      expect(zipTasksByTaskId([])).to.deep.equal({})
    });

  });
});
