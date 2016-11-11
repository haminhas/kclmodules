import React from 'react';
import { shallow } from 'enzyme';
import InputField from '.';
import style from './style.css';

describe('<InputField /> component', () => {
  it('renders an input', () => {
    const wrapper = shallow(<InputField input={<input />} error="" touched={false} />);
    expect(wrapper.find('input')).to.have.length(1);
  });

  it('does not render an error', () => {
    const wrapper = shallow(<InputField input={<input />} error="" touched={false} />);
    expect(wrapper.find(`.${style.validationError}`)).to.have.length(0);
  });

  it('does render an error if supplied an error and is touched', () => {
    const wrapper = shallow(<InputField input={<input />} error="error" touched />);
    expect(wrapper.find(`.${style.validationError}`)).to.have.length(1);
  });

  it('does render text if supplied an error', () => {
    const wrapper = shallow(<InputField input={<input />} error="error" touched />);
    expect(wrapper.find(`.${style.validationError}`).text()).to.equal('error');
  });
});
