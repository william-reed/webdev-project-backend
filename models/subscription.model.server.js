var mongoose = require('mongoose');
var subscriptionSchema = require('./subscription.schema.server');
var subscriptionModel = mongoose.model('SubscriptionModel', subscriptionSchema);

function createSubscription(subscription) {
    return subscriptionModel.create(subscription);
}

function findSubscriptionById(subscriptionId) {
    return subscriptionModel.findById(subscriptionId);
}

function findAllSubscriptions() {
    return subscriptionModel.find();
}

function findSubscriptionsForUser(userId) {
    return subscriptionModel.find({userId: userId});
}

function updateSubscription(subscription) {
    return subscriptionModel.findOneAndUpdate({'_id': subscription._id}, subscription, {new: true});
}

function deleteSubscription(subscriptionId) {
    return subscriptionModel.findByIdAndDelete(subscriptionId);
}

function alreadySubscribed(subscription) {
    return subscriptionModel.find({userId: subscription.userId, recurringReminder: subscription.recurringReminder})
        .then((res) => res.length > 0);
}


var api = {
    createSubscription,
    findSubscriptionById,
    findAllSubscriptions,
    findSubscriptionsForUser,
    updateSubscription,
    deleteSubscription,
    alreadySubscribed
};

module.exports = api;