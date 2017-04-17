import React, { PropTypes } from 'react';
import { Field } from 'redux-form';

import Form from 'app/components/Form';
import InputField from 'app/components/InputField';

const { func } = PropTypes;

const AddProjectForm = props => (
  <Form {...props} buttonText="Add Admin">
    <Field
      name="adminEmail"
      title="Admin Email"
      placeholder="example@kcl.ac.uk"
      component={InputField}
      type="text"
    />
  </Form>
);

AddProjectForm.propTypes = {
  onSubmit: func.isRequired,
};

export default AddProjectForm;
