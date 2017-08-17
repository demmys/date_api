process.env.SUPPRESS_NO_CONFIG_WARNING = true;

const config = require('config');
const Sequelize = require('sequelize');

const logger = require('../libs/logger');

let sequelize = new Sequelize(
    config.db.database,
    config.db.username,
    config.db.password,
    {
        host: config.db.host,
        port: config.db.port,
        dialect: config.db.dialect,
        logging: config.db.logging
    }
);
sequelize.authenticate().then(
    () => logger.info('Connected to database.')
).catch(
    err => logger.error('Database connection error.', err)
);

exports.Holidays = sequelize.define(
    'holidays',
    {
        date: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ['date']
            }
        ]
    }
);

exports.Sequelize = Sequelize;
exports.sequelize = sequelize;
