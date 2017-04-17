import validate from './validate';

describe('Admin Form Validation', () => {
  it('accepts valid input', () => {
    const input = {
      adminEmail: 'email@kcl.ac.uk',
    };
    const expectedErrors = {};
    expect(validate(input)).to.deep.equal(expectedErrors);
  });
  describe('Email validation', () => {
    it('rejects non kcl.ac.uk emails', () => {
      const input = {
        adminEmail: 'email@gov.ac.uk',
      };
      const expectedErrors = {
        adminEmail: 'Not an @kcl.ac.uk email',
      };
      expect(validate(input)).to.deep.equal(expectedErrors);
    });

    it('rejects blank email field', () => {
      const input = {
        adminEmail: '',
      };
      const expectedErrors = {
        adminEmail: 'Required',
      };
      expect(validate(input)).to.deep.equal(expectedErrors);
    });
  });
});
