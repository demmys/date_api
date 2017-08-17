const async = require('async');
const config = require('config');
const csv = require('csv');
const iconv = require('iconv-lite');
const request = require('request');

const logger = require('../libs/logger');
const Holidays = require('../models/holidays');

function getHolidays(callback) {
    let parser = csv.parse([ 'date', 'name' ]);
    let records = [];
    request(config.url.governmentHolidayCsv)
        .pipe(iconv.decodeStream('SJIS'))
        .pipe(iconv.decodeStream('UTF-8'))
        .pipe(parser)
        .pipe(csv.transform((record) => {
            records.push(record);
        }))
        .on('error', (err) => callback(err))
        .on('finish', () => {
            callback(null, records.slice(1));
        });
}

function main(callback) {
    getHolidays((err, holidays) => {
        if (err) {
            return logger.error('Request error.', err);
        }
        async.each(holidays, (holiday, callback) => {
            let date = new Date(holiday[0]);
            let name = holiday[1];
            Holidays.isHoliday(date, (err, isHoliday) => {
                if (err) {
                    logger.error('Holiday check error.', err);
                    return callback(err);
                }
                if (isHoliday) {
                    return callback();
                }
                Holidays.insert(date, name, (err) => {
                    if (err) {
                        logger.error('Holiday insert error.', err);
                    }
                    callback();
                });
            });
        }, callback);
    });
}

module.exports = main;
