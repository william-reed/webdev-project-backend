var mongoose = require('mongoose');

var subscriptionSchema = mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    recurringReminder: String,
    timeToSend: String
}, {collection: 'subscription'});

module.exports = subscriptionSchema;