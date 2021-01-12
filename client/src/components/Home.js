import React from 'react';
import PackageList from './PackageList';

const Home = ({ packageInfo }) => {
  return (
    <div>
      <h1>Package information</h1>
      {packageInfo.map((pkg) => (
        <PackageList key={pkg.name} name={pkg.name} />
      ))}
    </div>
  );
};

export default Home;
