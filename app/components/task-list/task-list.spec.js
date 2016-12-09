import React, {PropTypes} from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';

import TaskList from './task-list';

describe('TaskList', () => {

  it('should render .task-list element', () => {
    const wrapper = shallow(<TaskList isLoading={false}/>);
    expect(wrapper.find('.task-list')).to.have.length(1);
  });

  it('should render child elements when isLoading set to falce', () => {
    const wrapper = shallow(
      <TaskList task={{isLoading: false}}>
        <div className="test-name"></div>
      </TaskList>
    );
    expect(wrapper.find('.test-name')).to.have.length(1);
  });

  it('should render loading message when isLoading set to true', () => {
    const wrapper = shallow(<TaskList isLoading={true}/>);
    expect(wrapper.find('.task-list__loading-message')).to.have.length(1);
  });
});
