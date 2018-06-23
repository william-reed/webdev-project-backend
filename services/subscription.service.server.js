module.exports = function (app) {
    app.post('/api/subscription', createSubscription);
    app.get('/api/subscription', findAllSubscriptions);
    app.get('/api/subscription/:subscriptionId', findSubscriptionById);
    app.get('/api/user/:userId/subscriptions', findAllSubscriptionsForUser);
    app.get('/api/profile/subscriptions', findAllSubscriptionsForLoggedInUser);
    app.put('/api/subscription/:subscriptionId', updateSubscription);
    app.delete('/api/subscription/:subscriptionId', deleteSubscription);

    let subscriptionModel = require('../models/subscription.model.server');

    function createSubscription(req, res) {
        if (!req.session.authenticated) {
            res.status(401).send('Not logged in.');
            return;
        }
        let subscription = req.body;
        subscription.userId = req.session.currentUser._id;

        // is the user already subscribed to this?
        subscriptionModel.alreadySubscribed(subscription)
            .then(alreadySubscribed => {
                if (alreadySubscribed) {
                    res.status(400).send('You are already subscribed.');
                } else {
                    subscriptionModel.createSubscription(subscription)
                        .then(function (subscription) {
                            res.send(subscription);
                        });
                }
            })
    }

    function findSubscriptionById(req, res) {
        let id = req.params['subscriptionId'];
        subscriptionModel.findSubscriptionById(id)
            .then(function (subscription) {
                res.json(subscription);
            });
    }

    function findAllSubscriptions(req, res) {
        if (!req.session.authenticated) {
            res.status(401).send('Must be logged in');
            return;
        }

        let user = req.session.currentUser;
        if (!user.isAdmin) {
            res.status(401).send('Improper privileges to acccess this');
            return;
        }

        subscriptionModel.findAllSubscriptions()
            .then(function (subscriptions) {
                res.send(subscriptions);
            });
    }

    function findAllSubscriptionsForUser(req, res) {
        let id = req.params['userId'];
        subscriptionModel.findSubscriptionsForUser(id)
            .then(function (subscriptions) {
                res.json(subscriptions);
            });
    }

    function findAllSubscriptionsForLoggedInUser(req, res) {
        if (!req.session.authenticated) {
            res.status(401).send('Must be logged in');
            return;
        }

        let user = req.session['currentUser'];
        subscriptionModel.findSubscriptionsForUser(user._id)
            .then(function (subscriptions) {
                res.json(subscriptions);
            });
    }

    function updateSubscription(req, res) {
        if (!req.session.authenticated) {
            res.status(401).send('Must be logged in');
            return;
        }

        let subscription = req.body;
        subscriptionModel.updateSubscription(subscription)
            .then(function (subscription) {
                res.send(subscription);
            });

    }

    function deleteSubscription(req, res) {
        if (!req.session.authenticated) {
            res.status(401).send('User not authenticated');
            return;
        }
        // TODO: make sure the user actually owns the subscription before its deleted

        let id = req.params['subscriptionId'];
        subscriptionModel.deleteSubscription(id)
            .then(oldSubscription => res.send(oldSubscription));
    }

};