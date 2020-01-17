const express = require('express')
var socket = require('socket.io')
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

app.use('/static', express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', (req, res, next) => {
    res.render('index');
});
app.get('/toss', (req, res, next) => {
    res.render("tossScreen");
});
app.get('/game', (req, res, next) => {
    res.render("game");
});
app.get('/about', (req, res, next) => {
    res.render("about");
});

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 400;
    next(err);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;