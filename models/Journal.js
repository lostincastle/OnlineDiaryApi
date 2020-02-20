var mongoose = require('mongoose');

var Schema = mongoose.Schema;

let JournalSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    info: {
        type: String,
        required: true
    }
},
    {
    timestamps: true
    });

var Journal = mongoose.model('Journal', JournalSchema);
module.exports = Journal;