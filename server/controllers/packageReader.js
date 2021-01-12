const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

const getPackageDictionary = async (filePath) => {
  try {
    const data = await readFile(filePath, 'utf8');

    // grab the chunks that are between line breaks and put them in an array
    const packageDictionary = data
      // split by line breaks
      .split('\n\n')
      .filter((block) => block.trim() !== '')
      // parse names, descriptions and dependancies into an array
      .map(parsePackage);

    // Calculate dependentPackages property
    Object.keys(packageDictionary).forEach((name) => {
      const pkg = packageDictionary[name];
      const flatDependencies = [].concat(
        ...pkg.dependencies.map((dependency) => [
          dependency.main,
          ...dependency.alternatives,
        ])
      );
      flatDependencies.forEach((dependencyName) => {
        if (
          packageDictionary[dependencyName] &&
          !packageDictionary[dependencyName].dependentPackages.includes(name)
        ) {
          packageDictionary[dependencyName].dependentPackages.push(name);
        }
      });
    });

    return packageDictionary;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

const parsePackage = (text, index) => {
  try {
    return {
      name: parseName(text),
      description: parseDescription(text),
      dependencies: parseDependencies(text),
      dependentPackages: [],
    };
  } catch (error) {
    throw new Error(`Failed to parse entry ${index}: ${error.message}`);
  }
};

const parseName = (text) => {
  // grab the line that starts with "Package: " and ends in line break
  const matches = text.match(/Package:\s(.+)\n/);
  if (matches && matches[1]) {
    return matches[1];
  }
  throw new Error('Key "Package" not found');
};

const parseDescription = (text) => {
  const matches = text.match(/Description:\s(.+\n(\s.+\n)*)/);
  if (matches && matches[1]) {
    return matches[1];
  }
  throw new Error('Key "Description" not found');
};

const parseDependencies = (text) => {
  const matches = text.match(/\nDepends:\s(.+)\n/); // get the dependencies line
  if (!matches || !matches[1]) {
    // No dependencies for this package
    return [];
  }

  const dependenciesLine = matches[1]; // put dependenciesline in variable

  // 'libc6 (>= 2.2.5)' -> 'libc6'
  const parsePackageName = (packageString) => packageString.split(' ').shift();

  /*
   * E.g.
   * 'libc6 (>= 2.2.5), dpkg (>= 1.15.4) | install-info' ->
   * [{ main: 'libc6', alternatives: [] }, { main: 'dpkg', alternatives: ['install-info'] }]
   */
  const dependencies = dependenciesLine.split(', ').map((string) => {
    const packages = string.split(' | ');
    if (!packages || packages.length < 1) {
      throw new Error(`Invalid dependency format (${dependenciesLine})`);
    }
    const dependency = {
      main: parsePackageName(packages.shift()),
      alternatives: packages.map(parsePackageName),
    };
    return dependency;
  });

  // Filter out duplicates comparing by dependency.main
  return dependencies.filter(
    (dependency, index) =>
      dependencies.findIndex(
        (otherDependency) => otherDependency.main === dependency.main
      ) === index
  );
};

module.exports = { getPackageDictionary };
