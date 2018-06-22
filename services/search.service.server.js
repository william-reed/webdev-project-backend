const recurring = require('../models/recurring.model.server');

module.exports = function (app) {
    app.post('/api/search/:query', search);

    let reminderModel = require('../models/reminder.model.server');

    function search(req, res) {
        let query = req.params['query'];

        // find recurring that match
        const filteredRecurring = recurring
            .filter(recur => recur.title.includes(query) || recur.description.includes(query));

        // find past reminders that match
        reminderModel.findContainingQuery(query)
            .then(filteredReminders => res.json({
                recurring: filteredRecurring,
                reminders: filteredReminders
            }));
    }
};