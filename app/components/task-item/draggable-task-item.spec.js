import React, {PropTypes} from 'react';
import {expect} from 'chai';
import {shallow, mount} from 'enzyme';

import {DraggableTaskItem} from './draggable-task-item';
import TaskItem from './task-item';

describe('DraggableTaskItem', () => {

  it('should render TaskItem component matching props', () => {
    const onComplete = sinon.spy();
    const wrapper = shallow(<DraggableTaskItem onComplete={onComplete} task={{}}/>);
    expect(wrapper.find(TaskItem)).to.have.length(1);
  });

  it('should render DragHandle component', () => {
    const onComplete = sinon.spy();
    const wrapper = mount(<DraggableTaskItem onComplete={onComplete} task={{}}/>);
    expect(wrapper.find('.drag-handle')).to.have.length(1);
  });

});
