import {createReducer} from '../../helpers/reducers-heper';
import {zipTasksByTaskId, swapTaskPositions} from '../../helpers/task-helper';
import * as types from '../../constants/action-types';

export const initialState = {
  list: {},
  positionValues: [], // keeps tasks order within a list
  positionRevision: 0,
  items: {}, // taskId to task map
  isLoading: false,
  error: null
};

export default createReducer(initialState, {
  [types.FETCH_TASKS]: (state) => {
    return Object.assign({}, initialState, {
      isLoading: true
    })
  },
  [types.FETCH_TASKS_SUCCESS]: (state, {json}) => {
    const {list, tasks, tasksPositions: [tasksPositions]} = json;

    return Object.assign({}, initialState, {
      list,
      positionRevision: tasksPositions.revision,
      positionValues: tasksPositions.values,
      items: zipTasksByTaskId(tasks),
      isLoading: false
    });
  },
  [types.FETCH_TASKS_FAILURE]: (state, {error}) => {
    return Object.assign({}, state, {
      error,
      isLoading: false
    })
  },
  [types.ADD_TASK_SUCCESS]: (state, {json}) => {
    const items = state.items;
    const positionValues = state.positionValues;
    return Object.assign({}, state, {
      items: {...items, [json.id]: json},
      positionValues: [json.id, ...positionValues],
    });
  },
  [types.ADD_TASK_FAILURE]: (state, {error}) => {
    return Object.assign({}, state, {
      error,
      isLoading: false
    })
  },
  [types.TOGGLE_COMPLETE_TASK]: (state, {data}) => {
    const items = state.items;
    return Object.assign({}, state, {
      items: {...items, [data.taskId]: {...items[data.taskId], isLoading: true}}
    })
  },
  [types.TOGGLE_COMPLETE_TASK_SUCCESS]: (state, {json, data}) => {
    const items = state.items;
    return Object.assign({}, state, {
      items: {
        ...items,
        [data.taskId]: {
          ...items[data.taskId],
          revision: json.revision,
          completed: json.completed,
          isLoading: false
        }
      }
    })
  },
  [types.TOGGLE_COMPLETE_TASK_FAILURE]: (state, {error, data}) => {
    const items = state.items;
    return Object.assign({}, state, {
      items: {
        ...items, [data.taskId]: {...items[data.taskId], completed: false, isLoading: false}
      }, error
    });
  },

  [types.REORDER_TASKS]: (state, {data}) => {
    const updatedValues = swapTaskPositions(state.positionValues, data.oldIndex, data.newIndex);
    return Object.assign({}, state, {positionValues: updatedValues})
  },
  [types.REORDER_TASKS_SUCCESS]: (state, {json, data}) => {
    const {revision} = json;
    return Object.assign({}, state, {
      positionRevision: revision
    });
  },

  [types.REORDER_TASKS_FAILURE]: (state, {data, error}) => {
    const updatedValues = swapTaskPositions(state.positionValues, data.newIndex, data.oldIndex);
    return Object.assign({}, state, {positionValues: updatedValues}, {error})
  }
});

export function getActiveTasksOrderedList(state) {
  const indexedTaskList = state.items;
  const tasksPositions = state.positionValues;

  // We filter out tasks with no positions, in order to have data for position change
  // TODO check how these tasks should be added to the list
  return tasksPositions
    .filter(taskId => indexedTaskList[taskId] != null)
    .filter(taskId => indexedTaskList[taskId].completed == false)
    .map(taskId => indexedTaskList[taskId])
}

export function getCompletedTasksOrderedList(state, completedFilter) {
  const indexedTaskList = state.items;
  // for completed tasks we may skip order
  return Object.values(indexedTaskList)
    .filter(task => task.completed === true)
}

export function getTasksPositions(state) {
  return {
    positionValues: state.positionValues, // keeps tasks order within a list
    positionRevision: state.positionRevision
  };
}

export function getListInfo(state) {
  return state.list;
}

export function getError(state) {
  return state.error;
}

export function getIsLoading(state) {
  return state.isLoading
}
