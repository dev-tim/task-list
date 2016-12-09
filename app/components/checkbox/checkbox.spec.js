import React, {PropTypes} from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';

import Checkbox from './checkbox';

describe('Checkbox', () => {

  it('should render a simple div with .checkbox class', () => {
    const onChangeSpy = sinon.spy();
    const wrapper = shallow(<Checkbox checked={false} onChange={onChangeSpy}/>);
    expect(wrapper.is('.checkbox')).to.equal(true);
  });

  it('should invoke onChange callback checkbox was clicked', () => {
    const onChangeSpy = sinon.spy();
    const wrapper = shallow(<Checkbox checked={false} onChange={onChangeSpy}/>);
    wrapper.find('.checkbox').simulate('click');
    expect(onChangeSpy.called).to.equal(true);
  });

  it('should render .checkbox--checked class if checkbox has property checked', () => {
    const onChangeSpy = sinon.spy();
    const wrapper = shallow(<Checkbox checked={true} onChange={onChangeSpy}/>);
    expect(wrapper.is('.checkbox--checked')).to.equal(true);
  });

});
