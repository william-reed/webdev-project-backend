module.exports = function (app) {
    app.post('/api/reminder', createReminder);
    app.get('/api/reminder/random', findRandomReminders);
    app.get('/api/reminder/:reminderId', findReminderById);
    app.get('/api/reminder', findAllReminders);
    app.get('/api/user/:userId/reminders', findAllRemindersForUser);
    app.get('/api/profile/reminders', findAllRemindersForLoggedInUser);
    app.put('/api/reminder/:reminderId', updateReminder);
    app.delete('/api/reminder/:reminderId', deleteReminder);

    let reminderModel = require('../models/reminder.model.server');

    function createReminder(req, res) {
        if (!req.session.authenticated) {
            res.sendStatus(401);
            return;
        }
        let reminder = req.body;
        reminder.userId = req.session.currentUser._id;
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


    function findRandomReminders(req, res) {
        reminderModel.findAllReminders()
            .then(function (reminders) {
                let maxReminders = reminders.length > 15 ? 15 : reminders.length;
                let randomReminders = [];
                for (let i = 0; i < maxReminders; i++) {
                    randomReminders.push(getRandomEntry(reminders));
                }
                res.send(randomReminders);
            })
    }

    function getRandomEntry(arr) {
        return arr[Math.round(Math.random() * (arr.length - 1))];
    }

    function findAllRemindersForLoggedInUser(req, res) {
        if (!req.session.authenticated) {
            res.sendStatus(401);
            return;
        }

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
        if (!req.session.authenticated) {
            res.status(401).send('User not authenticated');
            return;
        }
        // TODO: make sure the user actually owns the reminder before its deleted

        let id = req.params['reminderId'];
        reminderModel.deleteReminder(id)
            .then(() => res.sendStatus(200));
    }

};