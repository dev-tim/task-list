import React, {PropTypes} from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';

import CreateTaskInput from './create-task-input';

describe('Create task input', () => {

  it('should render input field with a placeholder', () => {
    const placeholder = 'Test Placeholder';
    const wrapper = shallow(<CreateTaskInput onSave={() => {
    }} placeholder={placeholder}/>);
    expect(wrapper.find('FormControl').prop('placeholder')).to.equal(placeholder);
  });

  it('should invoke onSave callback when enter pressed', () => {
    const onSaveSpy = sinon.spy();
    const value = 'Sample input';
    const wrapper = shallow(<CreateTaskInput onSave={onSaveSpy} placeholder={''}/>);

    wrapper.find('FormControl').simulate('change', {target: {value}});
    wrapper.find('FormControl').simulate('keyDown', {which: 13});
    expect(onSaveSpy.called).to.equal(true);
  });

  it('should not invoke onSave if no taskValue was provided', () => {
    const onSaveSpy = sinon.spy();
    const wrapper = shallow(<CreateTaskInput onSave={onSaveSpy} placeholder={''}/>);
    wrapper.find('FormControl').simulate('keyDown', {which: 13});
    expect(onSaveSpy.called).to.equal(false);
  });

  it('should not invoke onSave if taskValue consists of spaces', () => {
    const onSaveSpy = sinon.spy();
    const value = '   ';
    const wrapper = shallow(<CreateTaskInput onSave={onSaveSpy} placeholder={''}/>);
    wrapper.find('FormControl').simulate('change', {target: {value}});
    wrapper.find('FormControl').simulate('keyDown', {which: 13});
    expect(onSaveSpy.called).to.equal(false);
  });

});
