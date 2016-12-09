import React, {PropTypes} from 'react';

class TaskList extends React.Component {

  render() {
    const {children, isLoading} = this.props;
    const loadingTaskList = isLoading ?
      <div className="task-list__loading-message">Loading ...</div> : children;

    return (
      <ul className="task-list">
        {loadingTaskList}
      </ul>
    )
  };
}

TaskList.propTypes = {
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
};

export default TaskList;
