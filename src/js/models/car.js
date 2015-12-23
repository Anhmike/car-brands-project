var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var carSchema = new Schema({
    name: String,
    description: String,
    logo: String
});

module.exports = mongoose.model('Car', carSchema);


