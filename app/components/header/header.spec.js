import React, {PropTypes} from 'react';
import {expect} from 'chai';
import {shallow, mount} from 'enzyme';

import Header from './header';

describe('Header', () => {

  it('should render .navbar element', () => {
    const wrapper = mount(<Header title="title"/>);
    expect(wrapper.find('.navbar-header')).to.have.length(1);
  });

  it('should render title passed via props', () => {
    const wrapper = shallow(<Header title="test title"/>);
    expect(wrapper.find('.wheader__title').text()).to.equal('test title');
  });

});
