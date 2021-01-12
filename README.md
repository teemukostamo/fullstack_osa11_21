# Package information

A website that lists package information from a .txt file following Ubuntu's `var/lib/dpkg/status` file's format.

A Node.js server is serving the data. A React app client displays packages in alphabetic order, and allows the user to click through packages based on dependencies and dependants.

## Development

- Clone the repository
- Run `npm install` in the root directory to install the server dependencies
- `cd` into the `client` folder, and run `npm install` to install the client dependencies.
- Run `npm run watch` in the project root directory to run the server in development mode.
- Run `npm start` in the `client` directory to run the React app in development mode.

## Tests

To run Cypress end to end tests:

- Start the server by running `npm start` in the project root folder
- Start the client by running `npm start` in the `client` folder
- Open another terminal window in the `client` folder, and run `npm run cypress:open`

## Deployment

In production the Node.js server serves the static production build of the React app

- To create a production build of the client and serve the static files with the server, run `npm run build:ui`.

- To create a production build of the client and deploy the application to Heroku, set up a Heroku remote for the repository, run `heroku config:set PORT=5000` to set the PORT varible, and run `npm run deploy:full`.

## Docker

- To build a Docker image of the repository, run `docker build -t package-info .` in the root directory

- To run the container, run `docker run -p 5000:5000 package-info`
