const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@kcl\.ac\.uk$/i.test(values.email)) {
    errors.email = 'Not an @kcl.ac.uk email';
  }
  if (!values.password) errors.password = 'Required';
  return errors;
};

export default validate;
