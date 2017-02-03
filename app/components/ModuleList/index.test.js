import React from 'react';
import { shallow } from 'enzyme';

import ModuleList from './index';
import ExpandablePanel from 'app/components/ExpandablePanel';

describe('app/components/ModuleList', () => {
  let component;

  beforeEach(() => {
    const modules = [
      {
        code: 'm1',
        name: 'test',
      },
      {
        code: 'm2',
        name: 'test',
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
      expect(component.find(ExpandablePanel)).to.have.length(2);
    });

    it('passes through the code', () => {
      expect(component.find(ExpandablePanel).first().prop('moduleCode')).to.equal('m1');
    });

    it('sets a key to identify this unique element', () => {
      expect(component.find(ExpandablePanel).first().key()).to.equal('0');
    });
  });
});
