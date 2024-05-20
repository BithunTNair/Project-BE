const COURTS = require('../models/courtModel');
const COURT_SCHEDULES = require("../models/courtSchedules");
const ObjectId = require("mongoose").Types.ObjectId;

const getAllCourtData = ((req, res, next) => {
    try {

        COURTS.find().then((result) => {
            res.status(200).json(result)
        })
            .catch((err) => {
                next()
            })

    } catch (error) {
        next();
    }
});

const singleCourtData = (async (req, res, next) => {
    try {
        const courtData = await COURTS.findOne({ _id: req.query.courtId })
        res.status(200).json(courtData)
    } catch (error) {
        next()
    }

});

const getSlotData = ((req, res) => {
    let currentHour = 0;
    let currentDate = new Date(req.query.date);
    if (new Date(new Date().setUTCHours(0, 0, 0, 0)) === currentDate) {
        currentHour = new Date().getHours();
    }

    COURT_SCHEDULES.aggregate([
        {
            $match: {
                courtId: ObjectId(req.query.courtId),
                date: currentDate,
                'slot.id': { $gte: currentHour }
            }
        },
        {
            $project: {
                _id: 1, data: 1, slot: 1, cost: 1, bookedBy: 1
            }
        }

    ]).then((result) => {
        console.log(result);
        res.status(200).json(result);
    })


    try {

    } catch (error) {
        next()

    }
})

module.exports = { getAllCourtData, singleCourtData, getSlotData };
