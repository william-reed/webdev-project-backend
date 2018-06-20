var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

function createUser(user) {
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function usernameAvailable(username) {
    return userModel.find({username})
        .then(user => user);
}

function findAllUsers() {
    return userModel.find();
}

function findUserByCredentials(credentials) {
    return userModel.findOne(credentials);
}

function updateUser(user) {
    return userModel.findOneAndUpdate({'_id': user._id}, user, {new: true});
}

function deleteUser(userId) {
    return userModel.findByIdAndDelete(userId);
}


var api = {
    createUser,
    findUserById,
    findAllUsers,
    findUserByCredentials,
    updateUser,
    deleteUser,
    usernameAvailable
};

module.exports = api;