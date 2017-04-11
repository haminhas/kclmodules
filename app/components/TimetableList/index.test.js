import React from 'react';
import { shallow } from 'enzyme';

import TimetableList from './index';
import TimetableCard from 'app/components/TimetableCard';

describe('app/components/TimetableList', () => {
  let modules;
  let component;
  const name = '5CCS2CSL';

  beforeEach(() => {
    modules = [
      [{
        code: '5CCS2CSL',
        compulsory: false,
        day: 'Thu',
        endtime: '10:00:00',
        groupnumber: 1,
        id: 24,
        moduletype: 19,
        name: 'Lecture',
        ratio: 0.1,
        starttime: '08:00:00',
      }, {
        code: '5CCS2CSL',
        compulsory: false,
        day: 'Mon',
        endtime: '09:00:00',
        groupnumber: 1,
        id: 25,
        moduletype: 19,
        name: 'Lab',
        ratio: 0.1,
        starttime: '10:00:00',
      }],
      [{
        code: '5CCS2DB',
        compulsory: false,
        day: 'Thu',
        endtime: '10:00:00',
        groupnumber: 1,
        id: 24,
        moduletype: 19,
        name: 'Lecture',
        ratio: 0.1,
        starttime: '08:00:00',
      }],
    ];
    component = shallow(<TimetableList
      modules={modules}
      name={name}
    />);
  });

  it('creates 1 priority oval for 2 supports with 1 line', () => {
    expect(component.find(TimetableCard)).to.have.length(5);
  });

  it('sets a key to identify this unique element', () => {
    expect(component.find(TimetableCard).first().key()).to.equal('0');
  });
});
