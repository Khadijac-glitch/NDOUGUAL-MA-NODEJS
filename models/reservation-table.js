const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    tableId: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('ReservationTable', reservationSchema);
