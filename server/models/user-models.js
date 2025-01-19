const {Schema, model} = require('mongoose')

const User = Schema({
    email: {type: String},
    password: {type: String}
})

module.exports = model('User', User)