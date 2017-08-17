const logger = require('../libs/logger');
const model = require('./model');

model.sequelize.sync().then(() => {
    logger.info('Synchronization finished.');
    process.exit(0);
}).catch(() => {
    logger.error('Synchronization error.', err);
    process.exit(1);
});
