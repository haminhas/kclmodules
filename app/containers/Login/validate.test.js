import validate from './validate';

describe('Login Form Validation', () => {
  it('accepts valid input', () => {
    const input = {
      email: 'email@kcl.ac.uk',
      password: 'pass',
    };
    const expectedErrors = {};
    expect(validate(input)).to.deep.equal(expectedErrors);
  });
  describe('Email validation', () => {
    it('rejects non red-badger emails', () => {
      const input = {
        email: 'email@gov.ac.uk',
        password: 'pass',
      };
      const expectedErrors = {
        email: 'Not an @kcl.ac.uk email',
      };
      expect(validate(input)).to.deep.equal(expectedErrors);
    });

    it('rejects blank email field', () => {
      const input = {
        email: '',
        password: 'pass',
      };
      const expectedErrors = {
        email: 'Required',
      };
      expect(validate(input)).to.deep.equal(expectedErrors);
    });
  });
  describe('Password field validation', () => {
    it('rejects blank password field', () => {
      const input = {
        email: 'email@kcl.ac.uk',
        password: '',
      };
      const expectedErrors = {
        password: 'Required',
      };
      expect(validate(input)).to.deep.equal(expectedErrors);
    });
  });
});
