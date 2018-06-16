module.exports = function (app) {
    app.post('/api/reminder', createReminder);
    app.get('/api/reminder/:reminderId', findReminderById);
    app.get('/api/reminder', findAllReminders);
    app.get('/api/user/:userId/reminders', findAllRemindersForUser);
    app.get('/api/profile/reminders', findAllRemindersForLoggedInUser);
    app.put('/api/reminder/:reminderId', updateReminder);
    app.delete('/api/reminder/:reminderId', deleteReminder);

    var reminderModel = require('../models/reminder.model.server');

    function createReminder(req, res) {
        let reminder = req.body;
        reminderModel.createReminder(reminder)
            .then(function (reminder) {
                res.send(reminder);
            })
    }

    function findReminderById(req, res) {
        let id = req.params['reminderId'];
        reminderModel.findReminderById(id)
            .then(function (reminder) {
                res.json(reminder);
            })
    }

    function findAllReminders(req, res) {
        reminderModel.findAllReminders()
            .then(function (reminders) {
                res.send(reminders);
            })
    }

    function findAllRemindersForUser(req, res) {
        let id = req.params['userId'];
        reminderModel.findRemindersForUser(id)
            .then(function (reminders) {
                res.json(reminders);
            })
    }

    function findAllRemindersForLoggedInUser(req, res) {
        let user = req.session['currentUser'];
        reminderModel.findRemindersForUser(user._id)
            .then(function (reminders) {
                res.json(reminders);
            })
    }

    function updateReminder(req, res) {
        let id = req.params['reminderId'];
        let reminder = req.body;
        reminderModel.updateReminder(reminder)
            .then(function (reminder) {
                res.send(reminder);
            });
    }

    function deleteReminder(req, res) {
        let id = req.params['reminderId'];
        reminderModel.deleteReminder(id);
        res.statusCode(200);
    }

}