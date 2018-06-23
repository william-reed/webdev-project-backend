module.exports = function (app) {
    app.post('/api/user', createUser);
    app.get('/api/user/:userId', findUserById);
    app.get('/api/user', findAllUsers);
    app.get('/api/profile', profile);
    app.put('/api/user', updateUser);
    app.delete('/api/user/:userId', deleteUser);

    app.get('/api/loggedin', loggedIn);
    app.post('/api/login', login);
    app.post('/api/logout', logout);
    app.get('/api/admin', isAdmin);

    let userModel = require('../models/user.model.server');

    function createUser(req, res) {
        if (req.session.authenticated) {
            let user = req.session.currentUser;
            if (!user.isAdmin) {
                res.status(400).send('Cannot create a new account when logged in w/o admin status.');
                return;
            }
        }

        let user = req.body;

        userModel.usernameAvailable(user.username)
            .then((dbUsers) => {
                if (dbUsers.length === 0) {
                    userModel.createUser(user)
                        .then(function (createdUser) {
                            if (!req.session.authenticated) {

                                req.session.currentUser = createdUser;
                                req.session.authenticated = true;

                                res.send(createdUser);
                            } else {
                                console.log('user created sending 200');
                                res.send(createdUser);
                            }
                        });
                } else {
                    res.status(400).send('Username not available.');
                }
            })
    }

    function findUserById(req, res) {
        let id = req.params['userId'];
        userModel.findUserById(id)
            .then(function (user) {
                res.json(user);
            })
    }

    function findAllUsers(req, res) {
        if (!req.session.authenticated) {
            res.status(401).send('Must be logged in');
            return;
        }

        let user = req.session.currentUser;
        if (!user.isAdmin) {
            res.status(401).send('Improper privileges to acccess this');
            return;
        }

        userModel.findAllUsers()
            .then(function (users) {
                res.send(users);
            })
    }

    function profile(req, res) {
        res.send(req.session['currentUser']);
    }

    function updateUser(req, res) {
        if (!req.session.authenticated) {
            res.sendStatus(401);
            return;
        }

        let user = req.session.currentUser;
        let newUser = req.body;
        userModel.updateUser(newUser)
            .then(function (updatedUser) {
                res.send(updatedUser);
            });
    }

    function deleteUser(req, res) {
        if (!req.session.authenticated) {
            res.status(401).send('Must be logged in');
            return;
        }

        let user = req.session.currentUser;
        if (!user.isAdmin) {
            res.status(401).send('Improper privileges to acccess this');
            return;
        }

        let id = req.params['userId'];
        userModel.deleteUser(id).then(function (oldUser) {
            res.send(oldUser);
        });
    }

    function loggedIn(req, res) {
        // don't want it to ever return undefined
        let loggedIn = req.session.authenticated;
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
                    res.status(401).send('Invalid username / password given');
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
            res.status(400).send('Cannot remove anonymous session');
        }
    }

    function isAdmin(req, res) {
        if (!req.session.authenticated) {
            res.send(false);
            return;
        }

        let user = req.session.currentUser;
        if (!user.isAdmin) {
            res.send(false)
            return;
        }

        res.send(true);
    }

};