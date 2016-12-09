import {expect} from 'chai';
import tasksReducer, {initialState, getTasksPositions, getActiveTasksOrderedList} from './tasks-reducer';
import {zipTasksByTaskId} from '../../helpers/task-helper';
import * as types from '../../constants/action-types';

describe('Tasks reducer', () => {
  describe('when processing fetchTasks actions', () => {

    it(`should set isLoading to true, when ${types.FETCH_TASKS} was called`, () => {
      expect(tasksReducer(initialState, {type: types.FETCH_TASKS})).to.deep.equal(Object.assign(initialState, {
        isLoading: true
      }))
    });

    it(`should set lists value when ${types.FETCH_TASKS_SUCCESS} was called`, () => {
      expect(tasksReducer(initialState, {
        type: types.FETCH_TASKS_SUCCESS,
        json: {list: {listId: 42}, tasks: [], tasksPositions: [{}]}
      }).list).to.deep.equal({listId: 42})
    });

    it(`should set task items values when ${types.FETCH_TASKS_SUCCESS} was called`, () => {
      const rawTasksData = [{id: 1, value: 'first'}, {id: 2, value: 'second'}]
      expect(tasksReducer(initialState, {
        type: types.FETCH_TASKS_SUCCESS,
        json: {list: {}, tasks: rawTasksData, tasksPositions: [{}]}
      }).items).to.deep.equal(zipTasksByTaskId(rawTasksData))
    });

    it(`should set task positions values when ${types.FETCH_TASKS_SUCCESS} was called`, () => {
      expect(tasksReducer(initialState, {
        type: types.FETCH_TASKS_SUCCESS,
        json: {list: {}, tasks: [], tasksPositions: [{values: [1, 2, 3, 4]}]}
      }).positionValues).to.deep.equal([1, 2, 3, 4])
    });

    it(`should set task positions values when ${types.FETCH_TASKS_SUCCESS} was called`, () => {
      expect(tasksReducer(initialState, {
        type: types.FETCH_TASKS_SUCCESS,
        json: {list: {}, tasks: [], tasksPositions: [{revision: 42}]}
      }).positionRevision).to.equal(42)
    });


    it(`should set error when ${types.FETCH_TASKS_FAILURE} was called`, () => {
      expect(tasksReducer(initialState, {
        type: types.FETCH_TASKS_FAILURE,
        error: {message: 'test'}
      }).error).to.deep.equal({message: 'test'})
    });
  });


  describe('when processing add task actions', () => {

    it(`should add task to items when ${types.ADD_TASK_SUCCESS} was called`, () => {
      expect(tasksReducer(initialState, {
        type: types.ADD_TASK_SUCCESS,
        json: {id: 42, title: 'test'}
      }).items).to.deep.equal({[42]: {id: 42, title: 'test'}})
    });

    it(`should not add task to items when ${types.ADD_TASK_FAILURE} was called`, () => {
      expect(tasksReducer(initialState, {
        type: types.ADD_TASK_FAILURE,
        error: {message: 'test'}
      }).error).to.deep.equal({message: 'test'})
    });
  });

  describe('when processing toggle complete task actions', () => {

    it(`should set loading state to the task item when ${types.TOGGLE_COMPLETE_TASK} was called`, () => {
      const state = Object.assign(initialState, {
        items: {
          [1]: {id: 1, title: 'test', completed: false}
        }
      });

      expect(tasksReducer(state, {
        type: types.TOGGLE_COMPLETE_TASK,
        data: {taskId: 1}
      }).items).to.deep.equal({
        [1]: {id: 1, title: 'test', completed: false, isLoading: true}
      })
    });

    it(`should update completed flag and revision when ${types.TOGGLE_COMPLETE_TASK_SUCCESS} was called`, () => {
      const state = Object.assign(initialState, {
        items: {
          [1]: {id: 1, title: 'test', completed: false, isLoading: true}
        }
      });

      expect(tasksReducer(state, {
        type: types.TOGGLE_COMPLETE_TASK_SUCCESS,
        data: {taskId: 1},
        json: {completed: true, revision: 42}
      }).items).to.deep.equal({
        [1]: {id: 1, title: 'test', isLoading: false, completed: true, revision: 42}
      })
    });

    it(`should revert isLoaidng for task item when ${types.TOGGLE_COMPLETE_TASK_FAILURE} was called`, () => {
      const state = Object.assign(initialState, {
        items: {
          [1]: {id: 1, title: 'test', completed: false, isLoading: true}
        }
      });

      expect(tasksReducer(state, {
        type: types.TOGGLE_COMPLETE_TASK_FAILURE,
        data: {taskId: 1},
      }).items).to.deep.equal({
        [1]: {id: 1, title: 'test', isLoading: false, completed: false}
      })
    });
  });

  describe('when calling getTasksPositions', () => {
    it('should return task positions info object', () => {
      const state = {positionValues: [1, 2, 3], positionRevision: 42};
      expect(getTasksPositions(state)).to.deep.equal(state)
    })
  });


  describe('when calling getActiveTasksOrderedList', () => {
    it('should return tasks ordered list', () => {
      const state = {
        positionValues: [1, 2, 3],
        items: {
          [2]: {id: 2, completed: false},
          [1]: {id: 1, completed: false},
          [3]: {id: 3, completed: false}
        }
      };
      expect(getActiveTasksOrderedList(state))
        .to.deep.equal([
        {id: 1, completed: false},
        {id: 2, completed: false},
        {id: 3, completed: false}
      ])
    });

    it('should return only tasks with existing positions', () => {
      const state = {
        positionValues: [1, 2],
        items: {
          [2]: {id: 2, completed: false},
          [1]: {id: 1, completed: false},
          [3]: {id: 3, completed: false}
        }
      };
      expect(getActiveTasksOrderedList(state))
        .to.deep.equal([{id: 1, completed: false}, {id: 2, completed: false}])
    })
  });

});
