const validate = ({ adminEmail }) => {
  const errors = {};
  if (!adminEmail) errors.adminEmail = 'Required';
  if (adminEmail && (!/^[A-Z0-9._%+-]+@kcl\.ac\.uk$/i.test(adminEmail))) {
    errors.adminEmail = 'Not an @kcl.ac.uk email';
  }
  return errors;
};

export default validate;
