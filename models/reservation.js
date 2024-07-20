const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    invites: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    hour: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Reservation', reservationSchema);
