var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const mongoose = require('mongoose');
mongoose.connect('mongodb://heroku_6k3891bs:73gsp23uusn3j7adgsk7fr75pg@ds263590.mlab.com:63590/heroku_6k3891bs');


var app = express();
app.use(cors());

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
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to sms_reminder db');
});


var session = require('express-session')
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'any string'
}));


app.get('/', function (req, res) {
    res.send('Hello World')
})

app.get('/api/session/set/:name/:value',
    setSession);
app.get('/api/session/get/:name',
    getSession);

function setSession(req, res) {
    var name = req.params['name'];
    var value = req.params['value'];
    req.session[name] = value;
    res.send(req.session);
}

function getSession(req, res) {
    var name = req.params['name'];
    var value = req.session[name];
    res.send(value);
}


var userService = require('./services/user.service.server');
userService(app);

var reminderService = require('./services/reminder.service.server');
reminderService(app);

var recurringService = require('./services/recurring.service.server');
recurringService(app);

var searchService = require('./services/search.service.server');
searchService(app);


app.listen(process.env.PORT || 3000);