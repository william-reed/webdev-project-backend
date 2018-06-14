var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

function createUser(user) {
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findAllUsers() {
    return userModel.find();
}

function findUserByCredentials(credentials) {
    return userModel.findOne(credentials);
}

function updateUser() {
    // TODO
    console.log("TODO updateUser");
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
    deleteUser
};

module.exports = api;