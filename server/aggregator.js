const tasksAPI = require('./tasks');
const Promise = require('bluebird');

export function transformAggregatedResult([list, tasks, tasksPositions]) {
  return {list, tasks, tasksPositions};
}

export function aggregateTasksInfo(token, list) {
  return [Promise.resolve(list), tasksAPI.fetchTasks(token, list.id), tasksAPI.fetchTasksPositions(token, list.id)];
}

const INBOX_LIST_TYPE = 'inbox';

function findInboxList(lists) {
  const filteredResult = lists.filter(list => list.list_type == INBOX_LIST_TYPE);
  return filteredResult.length > 0 ? filteredResult[0] : undefined;
}

export function aggregateTasks(token) {
  return tasksAPI.fetchTaskLists(token)
    .then((lists)=> {
      // here we are going to deal with Inbox only, we could fetch all the lists here
      const list = findInboxList(lists);
      if (list) {
        return Promise.all(aggregateTasksInfo(token, list))
          .then(transformAggregatedResult);
      } else {
        // fallback if inbox was not found
        return Promise.resolve([])
      }
    })
}
