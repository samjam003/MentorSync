const { default: mongoose } = require('mongoose')
const mongooose = require('mongoose')

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    number:{
        type: Number,
        required:true
    },
    password: {
        type: String,
    },
    registrationDateTime: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongooose.model('Admin',adminSchema)