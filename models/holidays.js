const model = require('./model');

class Holidays {
    static isHoliday(date, callback) {
        model.Holidays.findOne({
            where: { date: date }
        }).then(holiday => {
            if (holiday === null) {
                return callback(null, false);
            }
            callback(null, true);
        }).catch(err => callback(err));
    }

    static insert(date, name, callback) {
        model.Holidays.build({
            date: date,
            name: name
        }).save().then(
            () => callback()
        ).catch(
            (err) => callback(err)
        );
    }
}

module.exports = Holidays;
