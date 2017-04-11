import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router';

import Div from 'app/components/Div';

import AccountWidget from './component';

describe('<AccountWidget /> component', () => {
  it('displays an icon', () => {
    const wrapper = shallow(
      <AccountWidget
        isLoggedIn
        logout={() => {}}
      />
    );
    expect(wrapper.find('img')).to.have.length(1);
  });

  it('is used for logout when user is logged in', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <AccountWidget
        isLoggedIn
        logout={spy}
      />
    );
    expect(wrapper.type()).to.deep.equal(Div);
    expect(wrapper.find('span').text()).to.equal('Logout');
    wrapper.simulate('click');
    expect(spy).to.have.been.calledOnce();
  });

  it('is used for login when user is logged out', () => {
    const wrapper = shallow(
      <AccountWidget
        isLoggedIn={false}
        logout={() => {}}
      />
    );
    expect(wrapper.type()).to.deep.equal(Link);
    expect(wrapper.find('span').text()).to.equal('Login');
  });
});
