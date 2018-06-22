const mongoose = require('mongoose');
const anonymousReminderSchema = require('./anonymous-reminder.schema.server');
const anonymousReminderModel = mongoose.model('AnonymousReminderModel', anonymousReminderSchema);

function createAnonymousReminder(reminder) {
    return anonymousReminderModel.create(reminder);
}

function findAllAnonymousReminders() {
    return anonymousReminderModel.find();
}

function findContainingQuery(query) {
    return anonymousReminderModel.find({
        content: {
            "$regex": query, "$options": "i"
        }
    }).exec();
}

const api = {
    createAnonymousReminder,
    findAllAnonymousReminders,
    findContainingQuery
};

module.exports = api;