import React from 'react';
import { shallow } from 'enzyme';

import ModuleList from './index';
import Checkbox from 'rc-checkbox';

describe.only('app/components/ModuleList', () => {
  let component;

  beforeEach(() => {
    const modules = [
      {
        code: 'm1',
      },
      {
        code: 'm2',
      },
    ];

    component = shallow(
      <ModuleList
        modules={modules}
      />
    );
  });

  it('creates a list', () => {
    expect(component.find('ul')).to.have.length(1);
  });

  describe('Project elements', () => {
    it('displays an element for each module', () => {
      expect(component.find(Checkbox)).to.have.length(2);
    });

    it('passes through the code', () => {
      expect(component.find(Checkbox).first().prop('name')).to.equal('m1');
    });

    it('sets a key to identify this unique element', () => {
      expect(component.find(Checkbox).first().key()).to.equal('0');
    });
  });
});
