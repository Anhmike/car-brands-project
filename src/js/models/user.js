var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String,
    authCode: Number
});

module.exports = mongoose.model('User', userSchema);


