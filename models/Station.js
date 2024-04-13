const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    stations: {
        type: Array,
        required: true,
    }
});

const Station = mongoose.models.station || mongoose.model('station', stationSchema);

module.exports = Station;
