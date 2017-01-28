import React from 'react';
import ModuleCard from 'app/components/ModuleCard';
const ModuleListComponent = props => {
  const { modules } = props;
  return (
    <ul>
      { modules.map((item, index) => (
        <div key={index}>
          <ModuleCard
            key={index}
            moduleCode={item.code}
          />
        </div>
      ))}
    </ul>
  );
};

const { arrayOf, shape, string } = React.PropTypes;

ModuleListComponent.propTypes = {
  modules: arrayOf(shape({
    code: string.isRequired,
  })).isRequired,
};

export default ModuleListComponent;
