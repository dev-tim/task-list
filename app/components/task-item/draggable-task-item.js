import React, {PropTypes} from 'react';
import TaskItem from './task-item';
import DragHandle from 'components/drag-handle';
import {SortableElement} from 'react-sortable-hoc';

class DraggableTaskItem extends React.Component {

  render() {
    const {onComplete, task} = this.props;
    return (
      <TaskItem
        onComplete={onComplete}
        task={task}>
        <DragHandle/>
      </TaskItem>
    )
  }
}

DraggableTaskItem.propTypes = {
  onComplete: PropTypes.func,
  task: PropTypes.object,
};

export default SortableElement(DraggableTaskItem);
export {DraggableTaskItem};
