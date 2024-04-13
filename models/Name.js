const mongoose = require('mongoose');

const nameSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    names: {
        type: Array,
        required: true,
    }
});

const Name = mongoose.models.name || mongoose.model('name', nameSchema);

module.exports = Name;
