module.exports = function (app) {
    app.post('/api/user', createUser);
    app.get('/api/user/:userId', findUserById);
    app.get('/api/user', findAllUsers);
    app.get('/api/profile', profile);
    app.put('/api/user/:userId', updateUser);
    app.delete('/api/user/:userId', deleteUser);

    var userModel = require('../models/user.model.server');

    function createUser(req, res) {
        var user = req.body;
        userModel.createUser(user)
            .then(function (user) {
                req.session['currentUser'] = user;
                res.send(user);
            })
    }

    function findUserById(req, res) {
        var id = req.params['userId'];
        userModel.findUserById(id)
            .then(function (user) {
                res.json(user);
            })
    }

    function findAllUsers(req, res) {
        userModel.findAllUsers()
            .then(function (users) {
                res.send(users);
            })
    }

    function profile(req, res) {
        res.send(req.session['currentUser']);
    }

    function updateUser(req, res) {
        var id = req.params['userId'];
        var user = req.body;
        userModel.updateUser(user)
            .then(function (user) {
                res.send(user);
            });
    }

    function deleteUser(req, res) {
        var id = req.params['userId'];
        userModel.deleteUser(id);
        // TODO: return anything?
    }

}