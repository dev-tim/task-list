import React, {PropTypes} from 'react';
import {SortableContainer} from 'react-sortable-hoc';
import TaskList from './task-list';

const SortableTL = SortableContainer(TaskList);

class SortableTaskList extends React.Component {

  render() {
    const {children, isLoading, onReorder} = this.props;

    return (
      <SortableTL useDragHandle={true} isLoading={isLoading} onSortEnd={onReorder}>
        {children}
      </SortableTL>
    )
  };
}

SortableTaskList.propTypes = {
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
  onReorder: PropTypes.func.isRequired
};

export default SortableContainer(SortableTaskList);
