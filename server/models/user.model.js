const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'Full name can\'t be empty'
    },
    email: {
        type: String,
        required: 'Email can\'t be empty',
        unique: true
    },
    password: {
        type: String,
        required: 'Password can\'t be empty',
        minlength : [4,'Password must be atleast 4 character long']
    },

    address: {
        type: String,
        required: 'Address can\'t be empty',
        minlength: [10, 'Address must be atleast 10 Charcater']
    },

    occupation: {
        type: String,
        required: 'occupation can\'t be empty',
        // minlength: [7, 'occupation must be atleast 15 Charcater']
    },

    //city , companyName , jobPositiontitle

    city:{
        type: String,
        required: 'city can\'t be empty',
    },

    companyName: {
        type: String,
        required: 'companyName can\'t be empty',
    },

    jobPositiontitle: {
        type: String,
        required: 'jobPositiontitle can\'t be empty',
    },

    saltSecret: String
});

// Custom validation for email
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

// Events
userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

mongoose.model('User', userSchema);