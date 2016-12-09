import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getCompletedTasksOrderedList, getIsLoading, getError} from 'reducers/tasks-list';

import * as tasksActions from 'actions/tasks';

import {TaskItem} from 'components/task-item';
import {TaskList} from 'components/task-list';

class CompletedTasksList extends React.Component {

  static propTypes = {
    tasksActions: PropTypes.object.isRequired,
    isLoading: PropTypes.bool,
    tasks: PropTypes.array.isRequired,
    error: PropTypes.object,
  };

  componentDidMount() {
    this.props.tasksActions.fetchTasks();
  }

  onUndoTask(task) {
    this.props.tasksActions.undoTask(task.id, task.revision);
  }

  render() {
    const {tasks} = this.props;
    return (
      <TaskList isFetching={false}>
        Completed Tasks
        {
          tasks.length === 0 ?
            <div>No completed tasks in current session</div> :
            tasks.map((task, index) => (
              <TaskItem
                index={index}
                key={task.id}
                onComplete={this.onUndoTask.bind(this)}
                task={task}
              />
            ))
        }
      </TaskList>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: getIsLoading(state.tasks),
  tasks: getCompletedTasksOrderedList(state.tasks),
  error: getError(state.tasks),
});

const mapDispatchToProps = dispatch => ({
  tasksActions: bindActionCreators(tasksActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompletedTasksList);
