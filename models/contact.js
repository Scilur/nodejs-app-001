const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
});


const Сontact = mongoose.model('Сontact', contactSchema, "contacts");

module.exports = Сontact;