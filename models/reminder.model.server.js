var mongoose = require('mongoose');
var reminderSchema = require('./reminder.schema.server');
var reminderModel = mongoose.model('ReminderModel', reminderSchema);

function createReminder(reminder) {
    return reminderModel.create(reminder);
}

function findReminderById(reminderId) {
    return reminderModel.findById(reminderId);
}

function findAllReminders() {
    return reminderModel.find().populate('userId', 'username');
}

function findRemindersForUser(userId) {
    return reminderModel.find({userId: userId});
}

function updateReminder() {
    // TODO
    console.log("TODO updateReminder");
}

function deleteReminder(reminderId) {
    return reminderModel.findByIdAndDelete(reminderId);
}

function findContainingQuery(query) {
    return reminderModel.find({
        content: {
            "$regex": query, "$options": "i"
        }
    }).exec();
}

var api = {
    createReminder,
    findReminderById,
    findAllReminders,
    findRemindersForUser,
    updateReminder,
    deleteReminder,
    findContainingQuery
};

module.exports = api;