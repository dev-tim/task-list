import {CALL_API} from '../../redux/api-middleware';
import * as types from '../../constants/action-types';

export function addTask(listId, title) {
  return {
    [CALL_API]: {
      types: [types.ADD_TASK, types.ADD_TASK_SUCCESS, types.ADD_TASK_FAILURE],
      data: {
        list_id: listId,
        title,
        completed: false
      },
      method: 'POST',
      endpoint: `/api/tasks`
    }
  };
}

export function deleteTask(taskId, revision) {
  return {
    [CALL_API]: {
      types: [types.DELETE_TASK, types.DELETE_TASK_SUCCESS, types.DELETE_TASK_FAILURE],
      data: {
        revision
      },
      method: 'DELETE',
      endpoint: `/api/tasks/${taskId}`
    }
  };
}

/**
 * fetches tasks tree including lists for simplification,
 * we could fetch lists separately if needed
 */
export function fetchTasks() {
  return {
    [CALL_API]: {
      types: [types.FETCH_TASKS, types.FETCH_TASKS_SUCCESS, types.FETCH_TASKS_FAILURE],
      data: {},
      endpoint: `/api/tasks`
    }
  };
}

export function toggleTaskCompletion(completed) {
  return function (taskId, revision) {
    return {
      [CALL_API]: {
        types: [types.TOGGLE_COMPLETE_TASK, types.TOGGLE_COMPLETE_TASK_SUCCESS, types.TOGGLE_COMPLETE_TASK_FAILURE],
        data: {
          completed,
          revision,
          taskId
        },
        method: 'PUT',
        endpoint: `/api/tasks/${taskId}`
      }
    };
  }
}

export function completeTask(taskId, currentRevision) {
  return toggleTaskCompletion(true).apply(this, arguments)
}

export function undoTask(taskId, currentRevision) {
  return toggleTaskCompletion(false).apply(this, arguments)
}



