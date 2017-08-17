const path = require('path');
const fs = require('fs');

const config = require('config');
const express = require('express');
const morgan = require('morgan');

const logger = require('./libs/logger');
const todayRouter  = require('./controllers/today');

// Web server
let app = express();
// view files
app.set('views', './views');
app.set('view engine', 'pug');
// static files
app.use(express.static('public'));
// access logging
let logDir = path.dirname(config.log.access);
fs.existsSync(logDir) || fs.mkdirSync(logDir);
let stream = fs.createWriteStream(config.log.access, { flags: 'a' });
app.use(morgan('combined', { stream: stream }));
// routing
app.use('/today', todayRouter);
// error handling
app.use((err, req, res, next) => {
    logger.error('Unexpected error.', err);
    res.status(500).send('unexpected error');
});

// Start listening
let server = app.listen(config.port, () => {
    logger.info('Started server on port %s', config.port);
});

module.exports = server;
