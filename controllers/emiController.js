const { calculateEmi } = require('../models/emiCalculator');

exports.getEmiDetails = (req, res) => {
    console.log("request", req.body);
    const { booking_date, checkin_date, down_payment = null, amount, instalment_type, no_of_emi = null } = req.body;

    if (!booking_date || !checkin_date || !amount || !instalment_type) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    console.log('Request Data:', req.body);  // Log the request body for debugging
    try {
        const emiDetails = calculateEmi({ booking_date, checkin_date, down_payment, amount, instalment_type, no_of_emi });
        res.status(200).json(emiDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
