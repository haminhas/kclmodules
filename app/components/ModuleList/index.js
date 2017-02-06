import React from 'react';
import Title from 'app/components/Title';
import ExpandablePanel from 'app/components/ExpandablePanel';
import TimetableList from 'app/components/TimetableList';

const ModuleListComponent = props => {
  const { modules, title, moduleTimetables, name, moduleOnChange } = props;
  return (
    <ul>
    <Title type="large">{title}</Title>
    { modules.map((item, index) => (
        <div key={index}>
          <ExpandablePanel
            key={index}
            moduleCode={item.code}
            name={name}
            fieldDisabled={item.compulsory}
            moduleOnChange={moduleOnChange}
          >
          <TimetableList name={item.code} modules={moduleTimetables}/>
          </ExpandablePanel>
        </div>
    ))}
  </ul>
  );
};

const { arrayOf, shape, string, array, func } = React.PropTypes;

ModuleListComponent.propTypes = {
  modules: arrayOf(shape({
    code: string.isRequired,
  })).isRequired,
  title: string.isRequired,
  name: string.isRequired,
  moduleTimetables: array.isRequired,
  moduleOnChange: func.isRequired,
};

export default ModuleListComponent;
