var mongoose = require('mongoose');

var reminderSchema = mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    content: String,
    timeToSend: Date,
    sent: {type: Boolean, default: false},

}, {collection: 'reminder'});

module.exports = reminderSchema;