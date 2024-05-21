
const ORDERS = require('../models/ordersModel');
const COURT_SCHEDULES = require('../models/courtSchedules');
const Razorpay = require("razorpay");


const orders = (async (req, res,next) => {
    try {


        const slotData = await COURT_SCHEDULES.find({ _id: { $in: req.body.slotIds } });
        console.log({ slotIds });
        const totalCost = null;
        for (let slot of slotData) {
            if (slotData.bookedBy) {
                res.status(400).json({ message: 'slot is already occupied' });
                return;
            }
            else {
                totalCost += slot.cost
            }
            const instance = new Razorpay({
                key_id: process.env.RP_KEY_ID,
                key_secret: process.env.RP_SECRET_KEY,
            });
            const newOrder = await ORDERS({
                courtId: req.body.courtId,
                slotIds: req.body.slotIds,
                totalCost: totalCost,
                bookedBy: req.userId
            }).save()
            const options = {
                amount: totalCost * 100,
                currency: "INR",
                receipt: newOrder._id,
            };

            const order = await instance.orders.create(options);

            if (!order) return res.status(500).send("Some error occured");

            res.status(200).json(order);

        }
    } catch (error) {
next()
    }
});


const verify = ((req, res) => {

})
module.exports = { orders, verify };