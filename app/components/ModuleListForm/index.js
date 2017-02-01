import React, { PropTypes } from 'react';
import Form from 'app/components/Form';
import ModuleList from 'app/components/ModuleList';
const { func, arrayOf, shape, string } = PropTypes;

const ModuleListForm = props => (
  <Form {...props} buttonText="Check Clash">
  <ModuleList title="Current Modules" modules={props.modules} name="oldModules"/>
  <ModuleList title="New Modules" modules={props.newModules} name="newModules"/>
  </Form>
);

ModuleListForm.propTypes = {
  onSubmit: func.isRequired,
  modules: arrayOf(shape({
    code: string.isRequired,
  })).isRequired,
  newModules: arrayOf(shape({
    code: string.isRequired,
  })).isRequired,
};

export default ModuleListForm;
