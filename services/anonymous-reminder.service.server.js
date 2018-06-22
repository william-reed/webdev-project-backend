module.exports = function (app) {
    app.post('/api/anonymous-reminder', createAnonymousReminder);
    app.get('/api/anonymous-reminder', findAllAnonymousReminders);

    let anonymousReminderModel = require('../models/anonymous-reminder.model.server');

    function createAnonymousReminder(req, res) {
        let reminder = req.body;
        anonymousReminderModel.createAnonymousReminder(reminder)
            .then(function (reminder) {
                res.send(reminder);
            })
    }

    function findAllAnonymousReminders(req, res) {
        if (!req.session.authenticated) {
            res.status(401).send('Must be logged in');
            return;
        }

        let user = req.session.currentUser;
        if (!user.isAdmin) {
            res.status(401).send('Improper privileges to acccess this');
            return;
        }

        anonymousReminderModel.findAllAnonymousReminders()
            .then(function (reminders) {
                res.send(reminders);
            });
    }

};