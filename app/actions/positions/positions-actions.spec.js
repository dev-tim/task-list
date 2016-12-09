import configureMockStore from 'redux-mock-store';

import apiMiddleware from '../../redux/api-middleware';
import {assert, expect} from 'chai';

import * as types from '../../constants/action-types';
import {reorderTasks} from './positions-actions';

const mockStore = configureMockStore([apiMiddleware]);

import {sinonRespond} from '../../helpers/test-helper';

const taskPositions = {
  "id": 24,
  "values": [1, 2, 3, 4, 5],
  "revision": 1,
  "list_id": 123,
  "type": "task_position"
};

let server;
let store;


describe('Positions actions', () => {

  beforeEach(() => {
    store = mockStore({});
    server = sinon.fakeServer.create();
  });

  afterEach(() => {
    server.restore();
  });


  describe('when reordering task positions', () => {
    it(`should trigger PUT request to the backend with correct payload with ${types.REORDER_TASKS} action`, function (done) {
      server.respondWith('PUT', `/api/positions/${taskPositions.list_id}`,
        [200, {"Content-Type": "application/json"}, JSON.stringify(taskPositions)]);

      store.dispatch(reorderTasks(taskPositions.list_id, taskPositions.revision, taskPositions.values, 0, 1))
        .then(() => {
          const [requestAction, ...rest] = store.getActions();
          expect(requestAction.type).to.equal(types.REORDER_TASKS);
          done();
        });
      sinonRespond(server);
    });


    it(`should dispatch ${types.REORDER_TASKS_SUCCESS} action on successful update`, (done) => {
      server.respondWith('PUT', `/api/positions/${taskPositions.list_id}`,
        [200, {"Content-Type": "application/json"}, JSON.stringify(taskPositions)]);

      store.dispatch(reorderTasks(taskPositions.list_id, taskPositions.revision, taskPositions.values, 0, 1))
        .then(() => {
          const [requestAction, resultAction, ...rest] = store.getActions();
          expect(resultAction.type).to.equal(types.REORDER_TASKS_SUCCESS);
          expect(resultAction.json.list_id).to.deep.equal(taskPositions.list_id);
          done();
        });
      sinonRespond(server);
    });
  });
});
