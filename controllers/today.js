const express = require('express');

const Holidays = require('../models/holidays');

let router = express.Router();

router.get('/is_workday', (req, res) => {
    let responseHoliday = () => {
        res.status(404).send('0');
    };
    let today = new Date();
    let dow = today.getDay();
    if (dow == 0 || dow == 6) {
        return responseHoliday();
    }
    Holidays.isHoliday(today, (err, isHoliday) => {
        if (err) {
            return res.status(500).send('-1');
        }
        if (isHoliday) {
            return responseHoliday();
        }
        res.send('1');
    });
});

module.exports = router;
