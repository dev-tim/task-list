import configureMockStore from 'redux-mock-store';

import apiMiddleware from '../../redux/api-middleware';
import {assert, expect} from 'chai';

import {addTask, deleteTask, fetchTasks, toggleTaskCompletion} from './tasks-actions';
import * as types from '../../constants/action-types';

import {sinonRespond} from '../../helpers/test-helper';

const mockStore = configureMockStore([apiMiddleware]);
const task = {
  id: 1,
  listId: 42,
  title: 'TestTask',
  revision: 3
};

const tasksList = {
  list: {
    id: 111,
    title: "Read Later",
    list_type: "list",
    type: "list",
    revision: 2
  },
  tasks: [],
  tasksPositions: {
    values: []
  }
};

let server;
let store;

describe('Tasks actions', () => {

  beforeEach(() => {
    store = mockStore({});
    server = sinon.fakeServer.create();
  });

  afterEach(() => {
    server.restore();
  });

  describe('when creating task', () => {
    it('should trigger post request to the backend with correct payload', (done) => {
      server.respondWith('POST', '/api/tasks', [200, {"Content-Type": "application/json"}, JSON.stringify("")]);
      store.dispatch(addTask(task.listId, task.title))
        .then(() => {
          const [requestAction, ...rest] = store.getActions();
          expect(requestAction.type).to.deep.equal(types.ADD_TASK);
          done();
        });
      sinonRespond(server);
    });

    it('should trigger success action if case of successful request', (done) => {
      server.respondWith('POST', '/api/tasks', [200, {"Content-Type": "application/json"},
        JSON.stringify(task)]);

      store.dispatch(addTask(task.listId, task.title))
        .then(() => {
          const [requestAction, resultAction, ...rest] = store.getActions();
          expect(resultAction.type).to.deep.equal(types.ADD_TASK_SUCCESS);
          expect(resultAction.json).to.deep.equal(task);
          done();
        });

      sinonRespond(server);
    });

    it('should trigger failure action if case of failed request', (done) => {
      server.respondWith('POST', '/api/tasks', [401, {"Content-Type": "application/json"}, ""]);
      store.dispatch(addTask(task.listId, task.title))
        .then(() => {
          const [requestAction, resultAction, ...rest] = store.getActions();
          expect(resultAction.type).to.deep.equal(types.ADD_TASK_FAILURE);
          done();
        });
      sinonRespond(server);
    });
  });

  describe('when deleting task', function () {
    it('should trigger post request to the backend with correct payload', (done) => {
      server.respondWith('DELETE', `/api/tasks/${task.id}`, [200, {"Content-Type": "application/json"}, ""]);
      store.dispatch(deleteTask(task.id, task.revision))
        .then(() => {
          const [requestAction, ...rest] = store.getActions();
          expect(requestAction.type).to.equal(types.DELETE_TASK);
          done();
        });
      sinonRespond(server);
    });

    it('should trigger success action if case of successful request', (done) => {
      server.respondWith('DELETE', `/api/tasks/${task.id}`, [200, {"Content-Type": "application/json"},
        JSON.stringify(task)]);
      store.dispatch(deleteTask(task.id, task.revision))
        .then(() => {
          const [requestAction, resultAction, ...rest] = store.getActions();
          expect(resultAction.type).to.deep.equal(types.DELETE_TASK_SUCCESS);
          done();
        });
      sinonRespond(server);
    });

    it('should trigger failure action if case of successful request', (done) => {
      server.respondWith('DELETE', `/api/tasks/${task.id}`, [404, {"Content-Type": "application/json"}, ""]);
      store.dispatch(deleteTask(task.id, task.revision))
        .then(() => {
          const [requestAction, resultAction, ...rest] = store.getActions();
          expect(resultAction.type).to.deep.equal(types.DELETE_TASK_FAILURE);
          done();
        });
      sinonRespond(server);
    });
  });

  describe('when fetching tasks list', function () {
    it('should trigger get request to the backend with correct payload', (done) => {
      server.respondWith('GET', `/api/tasks/`, [200, {"Content-Type": "application/json"}, JSON.stringify(tasksList)]);
      store.dispatch(fetchTasks())
        .then(() => {
          const [requestAction, resultAction] = store.getActions();
          expect(requestAction.type).to.deep.equal(types.FETCH_TASKS);
          done();
        });
      sinonRespond(server);
    });

    it('should trigger success action wih tasks list in payload', (done) => {
      server.respondWith('GET', `/api/tasks`, [200, {"Content-Type": "application/json"}, JSON.stringify(tasksList)]);
      store.dispatch(fetchTasks())
        .then(() => {
          const [requestAction, resultAction, ...rest] = store.getActions();
          expect(resultAction.type).to.deep.equal(types.FETCH_TASKS_SUCCESS);
          expect(resultAction.json).to.deep.equal(tasksList);
          done();
        });

      sinonRespond(server);
    });

    it('should trigger failure action with error in playload', (done) => {
      server.respondWith('GET', `/api/tasks/${task.id}`, [404, {"Content-Type": "application/json"}, ""]);
      store.dispatch(fetchTasks())
        .then(() => {
          const [requestAction, resultAction, ...rest] = store.getActions();
          expect(resultAction.type).to.deep.equal(types.FETCH_TASKS_FAILURE);
          done();
        });
      sinonRespond(server);
    });
  });

  describe('when toggling task complete state', () => {
    it('should trigger put request to the backend with correct payload', (done) => {
      server.respondWith('PUT', `/api/tasks/${task.id}`, [200, {"Content-Type": "application/json"},
        JSON.stringify(task)]);
      store.dispatch(toggleTaskCompletion(true)(task.id, task.revision)).then(() => {
        const [requestAction, resultAction] = store.getActions();
        expect(requestAction.type).to.deep.equal(types.TOGGLE_COMPLETE_TASK);
        expect(requestAction.data).to.deep.equal({
          taskId: task.id,
          completed: true,
          revision: task.revision
        });
        done();
      });
      sinonRespond(server);
    });

    it('should trigger success action', (done) => {
      server.respondWith('PUT', `/api/tasks/${task.id}`, [200, {"Content-Type": "application/json"},
        JSON.stringify(task)]);
      store.dispatch(toggleTaskCompletion(true)(task.id, task.revision)).then(() => {
        const [requestAction, resultAction, ...rest] = store.getActions();

        expect(resultAction.type).to.equal(types.TOGGLE_COMPLETE_TASK_SUCCESS);
        expect(resultAction.json).to.deep.equal(Object.assign(task));
        done();
      });
      sinonRespond(server);
    });

    it('should trigger failure action with error in payload', (done) => {
      server.respondWith('PUT', `/api/tasks/${task.id}`, [401, {"Content-Type": "application/json"},
        JSON.stringify({error: 401})]);
      store.dispatch(toggleTaskCompletion(true)(task.id, task.revision)).then(() => {
        const [requestAction, resultAction, ...rest] = store.getActions();
        expect(resultAction.type).to.equal(types.TOGGLE_COMPLETE_TASK_FAILURE);
        expect(resultAction.error).to.deep.equal({error: 401});
        done();
      });
      sinonRespond(server);
    });
  });
});
