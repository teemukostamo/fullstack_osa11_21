import React from 'react';
import { Link } from 'react-router-dom';

const PackageList = ({ name }) => {
  return (
    <h3>
      <Link to={`/${name}`}>{name}</Link>{' '}
    </h3>
  );
};

export default PackageList;
