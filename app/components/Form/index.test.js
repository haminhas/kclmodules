import React from 'react';
import { shallow } from 'enzyme';

import Form from './index';

describe('Form component', () => {
  it('has a submit function', () => {
    const handleSubmit = () => {};
    const wrapper = shallow(
      <Form
        buttonText="submit"
        children={<input />}
        handleSubmit={handleSubmit}
        pristine
        submitting={false}
      />
    );
    expect(wrapper.find('form').prop('onSubmit')).to.exist();
  });

  it('renders children', () => {
    const handleSubmit = () => {};
    const wrapper = shallow(
      <Form
        buttonText="submit"
        children={<input />}
        handleSubmit={handleSubmit}
        pristine
        submitting={false}
      />
    );
    expect(wrapper.find('input')).to.have.length(1);
  });
});
