import React from 'react';

const TimetableListComponent = props => {
  const { modules, name } = props;
  return (
    <ul>
    { modules.filter((x) => x[0].code === name).map((item, index) => (
        <div key={index}>
          <h1>{item[0].code}</h1>
        </div>
    ))}
  </ul>
  );
};

const { arrayOf, shape, string } = React.PropTypes;

TimetableListComponent.propTypes = {
  modules: arrayOf(shape({
    code: string.isRequired,
  })).isRequired,
  name: string.isRequired,
};

export default TimetableListComponent;
