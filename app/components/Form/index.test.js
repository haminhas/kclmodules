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

  describe('submit button', () => {
    it('is disabled when form is pristine', () => {
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
      expect(wrapper.find('button').prop('disabled')).to.equal(true);
    });

    it('is disabled when form is being submitted', () => {
      const handleSubmit = () => {};
      const wrapper = shallow(
        <Form
          buttonText="submit"
          children={<input />}
          handleSubmit={handleSubmit}
          pristine={false}
          submitting
        />
      );
      expect(wrapper.find('button').prop('disabled')).to.equal(true);
    });

    it('displays text from prop', () => {
      const handleSubmit = () => {};
      const wrapper = shallow(
        <Form
          buttonText="submit"
          children={<input />}
          handleSubmit={handleSubmit}
          pristine={false}
          submitting
        />
      );
      expect(wrapper.find('button').text()).to.equal('submit');
    });
  });
});
