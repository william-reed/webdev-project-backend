var mongoose = require('mongoose');

var anonymousReminderSchema = mongoose.Schema({
    content: String,
    timeToSend: Date,
    phone: Number,
    carrier: String,
    sent: {type: Boolean, default: false},
}, {collection: 'user'});

module.exports = anonymousReminderSchema;