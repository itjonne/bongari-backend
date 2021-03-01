const express = require('express');
const mongoose = require('mongoose');
require('express-async-errors');
const cors = require('cors');

const middleware = require('./utils/middleware');
const config = require('./utils/config');
const logger = require('./utils/logger');
const objectsRouter = require('./controllers/objects');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const findsRouter = require('./controllers/finds');

const app = express();

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.json());

// Log all incoming requests
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

// ENDPOINTS
app.use('/api/objects', objectsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/finds', findsRouter);

// When something goes wrong
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
