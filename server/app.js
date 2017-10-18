import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import errorHandler from './utils/error.handler';
import config from './config';

// configure mongoose
require('./config/mongoose');

// Set up our express app
const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.set('root', '../');
const staticFolder = `${app.get('root')}${config.isProd ? 'dist' : 'public'}`;
app.use(express.static(path.join(__dirname, staticFolder)));

// Set the api routes
app.use(require('./utils/auth.middleware'));
app.use('/api', require('./routes/index'));

// Set up the middleware for sending errors
app.use(errorHandler);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/404.html'));
});

const port = config.port || 3000;
app.set('port', port);

//Listen on provided port
app.listen(port, () => {
    console.log(`The API server is listening at localhost:${port}`);
});
