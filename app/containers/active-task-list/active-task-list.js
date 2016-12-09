import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getActiveTasksOrderedList, getTasksPositions, getListInfo, getError, getIsLoading} from 'reducers/tasks-list';

import * as tasksActions from 'actions/tasks';
import * as positionsActions from 'actions/positions';

import {DraggableTaskItem} from 'components/task-item';
import {SortableTaskList} from 'components/task-list';

class ActiveTasksList extends React.Component {

  static propTypes = {
    tasksActions: PropTypes.object.isRequired,
    positionsActions: PropTypes.object.isRequired,
    isLoading: PropTypes.bool,
    taskPositions: PropTypes.object.isRequired,
    tasks: PropTypes.array.isRequired,
    list: PropTypes.object.isRequired,
    error: PropTypes.object,
  };

  componentDidMount() {
    this.props.tasksActions.fetchTasks();
  }

  onCompleteTask(task) {
    this.props.tasksActions.completeTask(task.id, task.revision);
  }

  onReorderTaskItems(indexes) {
    if (indexes && indexes.newIndex !== undefined && indexes.newIndex !== indexes.oldIndex) {
      const {list, taskPositions} = this.props;
      this.props.positionsActions.reorderTasks(
        list.id,
        taskPositions.positionRevision,
        taskPositions.positionValues,
        indexes.oldIndex,
        indexes.newIndex
      );
    }
  }

  render() {
    const {isLoading, tasks} = this.props;
    return (
      <SortableTaskList
        isFetching={isLoading}
        onReorder={this.onReorderTaskItems.bind(this)}>
        Active Tasks

        {
          tasks.map((task, index) => (
            <DraggableTaskItem
              index={index}
              key={task.id}
              onComplete={this.onCompleteTask.bind(this)}
              task={task}
            />
          ))
        }
      </SortableTaskList>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: getIsLoading(state.tasks),
  taskPositions: getTasksPositions(state.tasks),
  list: getListInfo(state.tasks),
  tasks: getActiveTasksOrderedList(state.tasks),
  error: getError(state.tasks),
});

const mapDispatchToProps = dispatch => ({
  tasksActions: bindActionCreators(tasksActions, dispatch),
  positionsActions: bindActionCreators(positionsActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveTasksList);
