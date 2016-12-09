import React, {PropTypes} from 'react';
import {SortableHandle} from 'react-sortable-hoc';


class DragHandle extends React.Component {
  render() {
    return (
      <div className="drag-handle">
        <div className="drag-handle___icon"/>
      </div>
    )
  }
}

export default SortableHandle(DragHandle);
export {DragHandle};
