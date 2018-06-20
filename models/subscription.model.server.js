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

function deleteSubscription(subscriptionId) {
    return subscriptionModel.findByIdAndDelete(subscriptionId);
}


var api = {
    createSubscription,
    findSubscriptionById,
    findAllSubscriptions,
    findSubscriptionsForUser,
    deleteSubscription
};

module.exports = api;