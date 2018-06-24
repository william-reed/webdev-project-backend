const mongoose = require('mongoose');
const reminderSchema = require('./reminder.schema.server');
const reminderModel = mongoose.model('ReminderModel', reminderSchema);

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

function updateReminder(reminder) {
    return reminderModel.findOneAndUpdate({'_id': reminder._id}, reminder, {new: true});
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

const api = {
    createReminder,
    findReminderById,
    findAllReminders,
    findRemindersForUser,
    updateReminder,
    deleteReminder,
    findContainingQuery
};

module.exports = api;