import {CALL_API} from '../../redux/api-middleware';
import * as types from '../../constants/action-types';


export function reorderTasks(listId, revision, taskPositions, oldIndex, newIndex) {
  return {
    [CALL_API]: {
      types: [types.REORDER_TASKS, types.REORDER_TASKS_SUCCESS, types.REORDER_TASKS_FAILURE],
      method: 'PUT',
      data: {
        values: taskPositions,
        revision,
        oldIndex,
        newIndex
      },
      endpoint: `/api/positions/${listId}`
    }
  };
}
