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
    return reminderModel.find();
}

function findRemindersForUser(userId) {
    return reminderModel.find({userId});
}

function updateReminder() {
    // TODO
    console.log("TODO updateReminder");
}

function deleteReminder(reminderId) {
    return reminderModel.findByIdAndDelete(reminderId);
}

var api = {
    createReminder,
    findReminderById,
    findAllReminders,
    findRemindersForUser,
    updateReminder,
    deleteReminder
};

module.exports = api;