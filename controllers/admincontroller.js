const COURTS = require('../models/courtModel');
const COURTSCHEDULES = require('../models/courtSchedules');


const createnewcourt = (req, res) => {
    const {
        name,
        location,
        type,
        address3,
        address2,
        address1,
        landMark,
        pin,
        contactNumber,
        description

    } = req.body;
    const pics = req.files.map((file) => { return { name: file.filename, type: file.mimetype } })
    COURTS({
        name,
        location,
        type,
        address3,
        address2,
        address1,
        landMark,
        pin,
        contactNumber,
        description,
        courtPics: pics

    }).save().then((response) => {
        res.status(200).json({ message: 'court added successfully' })
    })
        .catch((err) => {
            console.log(err);
            res.status(500)
        })
};
const createCourtSchedule = ((req, res) => {
    try {
        const { startDate, endDate, cost, selectedSlots, courtId } = req.body;
        let currentDate = new Date(new Date(startDate).setUTCHours(0, 0, 0, 0));
        let lastDate = new Date(new Date(endDate).setUTCHours(0, 0, 0, 0));
        const slotObjects = [];
        while (currentDate <= lastDate) {
            for (let data of selectedSlots) {
                slotObjects.push({
                    date: JSON.parse(JSON.stringify(currentDate)),
                    slot: {
                        name: data.name,
                        id: data.id,
                    },
                    cost,
                    courtId,
                })
            }
            currentDate.setDate(currentDate.getDate()+1);
        }
        console.log(slotObjects);
        COURTSCHEDULES.insertMany(slotObjects).then((response) => {
            res.status(200).json({ message: 'court schedules added successfully' });
        })
            .catch((err) => {
                if (err.code === 11000) {
                    res.status(500).json({ message: `already scheduled` })
                } else {
                    res.status(500).json({ message: `something went wrong` })
                }
            })
    } catch (error) {
        console.log(error);
    }
})

module.exports = { createnewcourt, createCourtSchedule };