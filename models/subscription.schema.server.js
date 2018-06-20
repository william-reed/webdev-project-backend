var mongoose = require('mongoose');

var subscriptionSchema = mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    recurringReminder: String,
    timeToSend: Date
}, {collection: 'subscription'});

module.exports = subscriptionSchema;