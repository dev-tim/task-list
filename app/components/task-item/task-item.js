import React, {PropTypes} from 'react';
import classnames from 'classnames';
import Checkbox from '../checkbox';

class TaskItem extends React.Component {
  render() {
    const {children, onComplete, task} = this.props;
    return (
      <li className={classnames('task-item', {
        'task-item--completed': task.completed,
        'task-item--loading': task.isLoading,
      })}>
        {children}
        <Checkbox
          checked={task.completed}
          onChange={() => onComplete(task)}
        />
        <span className="task-item__text">{task.title}</span>
      </li>
    )
  }
}

TaskItem.propTypes = {
  children: PropTypes.node.isRequired,
  onComplete: PropTypes.func,
  task: PropTypes.object,
};

export default TaskItem;
