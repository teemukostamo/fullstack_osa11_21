import React from 'react';
import { Link } from 'react-router-dom';

const PackageDetails = ({ name, details }) => {
  const dependencies = () => {
    if (details.dependencies.length > 0) {
      return (
        <ul>
          {details.dependencies.map((d) => (
            <li key={d.main}>
              <Link to={`/${d.main}`}>{d.main}</Link>{' '}
            </li>
          ))}
        </ul>
      );
    }
    return <div className='noDependents'>No dependencies!</div>;
  };

  const dependentPackages = () => {
    if (details.dependentPackages.length > 0) {
      return (
        <ul>
          {details[1].dependentPackages.map((d) => (
            <li key={d}>
              <Link to={`/${d}`}>{d}</Link>{' '}
            </li>
          ))}
        </ul>
      );
    }
    return <div className='noDependents'>No dependent packages!</div>;
  };

  return (
    <div>
      <h2>{name}</h2>
      {details.description}
      <h4>Dependencies:</h4>
      {dependencies()}
      <h4>Dependent packages:</h4>
      {dependentPackages()}
      <div className='homeBtn'>
        <Link to='/'>BACK TO INDEX</Link>
      </div>
    </div>
  );
};

export default PackageDetails;
