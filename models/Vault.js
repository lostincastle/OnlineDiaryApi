var mongoose = require('mongoose');

var Schema = mongoose.Schema;

let VaultSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        required: true
    }
},
    {
    timestamps: true
    });

var Vault = mongoose.model('Vault', VaultSchema);
module.exports = Vault;