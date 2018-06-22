const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sms_reminder');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin",
        "http://localhost:4200");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// test mongo
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to sms_reminder db');
});


const session = require('express-session');
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'any string'
}));


app.get('/', function (req, res) {
    res.send('Hello World')
});


const userService = require('./services/user.service.server');
userService(app);

const reminderService = require('./services/reminder.service.server');
reminderService(app);

const recurringService = require('./services/recurring.service.server');
recurringService(app);

const searchService = require('./services/search.service.server');
searchService(app);

const subscriptionService = require('./services/subscription.service.server');
subscriptionService(app);

const anonymousReminderService = require('./services/anonymous-reminder.service.server');
anonymousReminderService(app);


app.listen(3000);