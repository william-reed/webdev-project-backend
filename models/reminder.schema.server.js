var mongoose = require('mongoose');

var reminderSchema = mongoose.Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'user'},
    content: String,
    timeToSend: Date,
    sent: Boolean,

}, {collection: 'reminder'});

module.exports = reminderSchema;