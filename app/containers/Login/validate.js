const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@red\-badger\.com$/i.test(values.email)) {
    errors.email = 'Not an @red-badger.com email';
  }
  if (!values.password) errors.password = 'Required';
  return errors;
};

export default validate;
