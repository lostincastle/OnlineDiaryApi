var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
  
    username: {
        type: String,
        required: true,
        unique: true
    },

    admin: {
        type: Boolean,
        default: false
},
    email: {
        type: String,
        required: true
    },

 
    password: {
        type: String,
        required: true
    } 
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);