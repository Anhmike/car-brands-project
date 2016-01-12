var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String,
    token: String,
    exp: Number
});

module.exports = mongoose.model('User', userSchema);


