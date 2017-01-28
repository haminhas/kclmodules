import React from 'react';
import ModuleCard from 'app/components/ModuleCard';
import Title from 'app/components/Title';

const ModuleListComponent = props => {
  const { modules } = props;
  return (
    <div>
    <Title type="large">{props.title}</Title>
    { modules.map((item, index) => (
      <div key={index}>
        <ModuleCard
          key={index}
          moduleCode={item.code}
        />
      </div>
    ))}
  </div>
  );
};

const { arrayOf, shape, string } = React.PropTypes;

ModuleListComponent.propTypes = {
  modules: arrayOf(shape({
    code: string.isRequired,
  })).isRequired,
  title: string.isRequired,
};

export default ModuleListComponent;
