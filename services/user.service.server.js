module.exports = function (app) {
    app.post('/api/user', createUser);
    app.get('/api/user/:userId', findUserById);
    app.get('/api/user', findAllUsers);
    app.get('/api/profile', profile);
    app.put('/api/user/:userId', updateUser);
    app.delete('/api/user/:userId', deleteUser);

    app.get('/api/loggedin', loggedIn);
    app.post('/api/login', login);
    app.post('/api/logout', logout);

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
        let id = req.params['userId'];
        let user = req.body;
        userModel.updateUser(user)
            .then(function (user) {
                res.send(user);
            });
    }

    function deleteUser(req, res) {
        let id = req.params['userId'];
        userModel.deleteUser(id).then(function (users) {
            res.send(users);
        });
    }

    function loggedIn(req, res) {
        // don't want it to ever return undefined
        let loggedIn = req.session.authenticated
        loggedIn = loggedIn || false;
        res.send(loggedIn);
    }

    function login(req, res) {
        let credentials = req.body;
        if (credentials.username === undefined || credentials.password === undefined) {
            res.sendStatus(401);
            return;
        }

        userModel
            .findUserByCredentials(credentials)
            .then(function (user) {
                if (user === null) {
                    res.sendStatus(401);
                    return;
                }
                req.session.currentUser = user;
                req.session.authenticated = true;
                res.json(user);
            });
    }

    function logout(req, res) {
        if (req.session.authenticated) {
            req.session.authenticated = false;
            delete req.session.currentUser;
            res.sendStatus(200);
        } else {
            res.status(500).send('Cannot remove anonymous session');
        }
    }

}