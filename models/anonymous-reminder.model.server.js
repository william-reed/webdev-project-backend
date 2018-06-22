var mongoose = require('mongoose');
var anonymousReminderSchema = require('./anonymous-reminder.schema.server');
var anonymousReminderModel = mongoose.model('AnonymousReminderModel', anonymousReminderSchema);

function createAnonymousReminder(reminder) {
    return anonymousReminderModel.create(reminder);
}

function findAllAnonymousReminders() {
    return anonymousReminderModel.find();
}


var api = {
    createAnonymousReminder,
    findAllAnonymousReminders
};

module.exports = api;