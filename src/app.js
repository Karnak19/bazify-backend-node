const express = require('express');
const rfs = require('rotating-file-stream');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const middlewares = require('./middlewares');
const api = require('./api');
const auth = require('./auth');

const app = express();

const accessLogStream = rfs.createStream('access.log', {
  interval: process.env.NODE_ENV === 'production' ? '1d' : '1h', // rotate daily
  path: path.join(__dirname, '../logs'),
});

// setup the logger
app.use(morgan('[:date[clf]] :remote-addr :method :url :status'));
app.use(
  morgan('[:date[clf]] :remote-addr :method :url :status', {
    stream: accessLogStream,
  })
);
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/', express.static('frontsrc/dist'));

app.use('/auth', auth);
app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
