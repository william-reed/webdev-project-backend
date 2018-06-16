const recurring = require('../models/recurring.model.server');

module.exports = function (app) {
    app.get('/api/recurring', getRecurringReminders);
    app.get('/api/recurring/example/:title', getRecurringExample);
    app.get('/api/recurring/:title', getRecurringByTitle);

    function getRecurringReminders(req, res) {
        res.send(recurring);
    }

    function getRecurringExample(req, res) {
        let title = req.params['title'];
        findRecuringByTitle(title).fetch()
            .then(apiRes => res.send(apiRes));
    }

    function getRecurringByTitle(req, res) {
        let title = req.params['title'];
        let recurring = findRecuringByTitle(title);
        res.json(recurring);
    }

    function findRecuringByTitle(title) {
        return recurring.find((element) => element.title === title)
    }
}