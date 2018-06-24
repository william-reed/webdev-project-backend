const mongoose = require('mongoose');

const anonymousReminderSchema = mongoose.Schema({
    content: String,
    timeToSend: Date,
    phone: Number,
    carrier: String,
    sent: {type: Boolean, default: false},
}, {collection: 'anonymous-reminder'});

module.exports = anonymousReminderSchema;