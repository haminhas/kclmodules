import React from 'react';
import Checkbox from 'rc-checkbox';

const ModuleListComponent = props => {
  const { modules } = props;
  return (
    <ul>
      { modules.map((item, index) => (
        <div key={index}>
          <label>
            <Checkbox
              key={index}
              name={item.code}
            />
          { item.code }
          </label>
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
