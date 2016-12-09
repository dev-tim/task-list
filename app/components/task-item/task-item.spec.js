import React, {PropTypes} from 'react';
import {expect} from 'chai';
import {shallow, mount} from 'enzyme';

import TaskItem from './task-item';

describe('TaskItem', () => {

  it('should render .task-item element', () => {
    const onComplete = sinon.spy();
    const wrapper = shallow(<TaskItem onComplete={onComplete} task={{}}/>);
    expect(wrapper.find('.task-item')).to.have.length(1);
  });

  it('should render .task-item--loading when isLoading property set to true', () => {
    const onComplete = sinon.spy();
    const wrapper = shallow(<TaskItem onComplete={onComplete} task={{isLoading: true}}/>);
    expect(wrapper.find('.task-item--loading')).to.have.length(1);
  });

  it('should render checkbox when isLoading property set to false', () => {
    const onComplete = sinon.spy();
    const wrapper = shallow(<TaskItem onComplete={onComplete} task={{isLoading: false}}/>);
    expect(wrapper.find('Checkbox')).to.have.length(1);
  });

  it('should trigger con complete when checkbox is clicked', () => {
    const onComplete = sinon.spy();
    const wrapper = mount(<TaskItem onComplete={onComplete} task={{isLoading: false}}/>);
    wrapper.find('.checkbox').simulate('click');
    expect(onComplete.called).to.equal(true);
  });

  it('should render completed when completed property set to true', () => {
    const onComplete = sinon.spy();
    const wrapper = shallow(<TaskItem onComplete={onComplete} task={{completed: true}}/>);
    expect(wrapper.find('.task-item--completed')).to.have.length(1);
  });

  it('should task title', () => {
    const onComplete = sinon.spy();
    const wrapper = shallow(<TaskItem onComplete={onComplete} task={{title: 'Test title'}}/>);
    expect(wrapper.find('.task-item__text').text()).to.equal('Test title');
  });

});
