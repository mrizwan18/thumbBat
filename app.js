const express = require('express')
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const User = require('./models/user');
const Plane = require('./models/plane');
const Highscore = require('./models/highscore');

app.use('/static', express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('dev'));

var sess;
var highscores;
mongoose.connect('mongodb+srv://razi:7751930710b@cluster0-tkgab.mongodb.net/test?retryWrites=true&w=majority')



app.get('/', (req, res, next) => {
    res.render('index');
});
app.get('/toss', (req, res, next) => {
    res.render("tossScreen");
});
app.get('/game', (req, res, next) => {
    res.render("game");
});

app.post('/plane', (req, res, next) => {
    sess = req.session;
    if (!sess.username) {
        return res.render('plane', { unlocked: sess.maxPlane });
    }
    const user = User.findOne({ username: sess.username })
        .exec()
        .then(user => {
            let plane = user.plane;
            return res.render('plane', { unlocked: plane });
        });

});

app.post('/level', (req, res, next) => {
    sess = req.session;
    if (!sess.username) {
        return res.render('level', { unlocked: sess.maxLevel });
    }
    const user = User.findOne({ username: sess.username })
        .exec()
        .then(user => {
            let level = user.level;
            return res.render('level', { unlocked: level });
        });

});

app.post('/unlock-level', (req, res, next) => {
    console.log("unlcok-level");
    sess = req.session;


    console.log(req.body);
    sess.score = req.body.score;
    sess.lives = req.body.lives;

    if (sess.level === 10)
        return res.redirect('/unlock-plane');
    if (!sess.username) {
        if (sess.level === sess.maxLevel) {
            sess.maxLevel += 1;
            sess.level += 1;
            res.redirect('/unlock-plane');
        }
        else {
            sess.level += 1;
            res.redirect('/unlock-plane');
        }
    }
    else {
        const user = User.findOne({ username: sess.username })
            .exec()
            .then(user => {
                if (sess.level === user.level) {
                    User.findByIdAndUpdate(user._id, { $set: { level: sess.level + 1 } })
                        .then(user2 => {
                            sess.level += 1;
                            sess.maxLevel += 1;
                            res.redirect('/unlock-plane');
                        });
                }
                else {
                    sess.level += 1;
                    res.redirect('/unlock-plane');
                }
            });
    }


})

app.get('/unlock-plane', (req, res, next) => {
    sess = req.session;
    if (sess.plane === 10)
        return res.redirect('/game');
    if (!sess.username) {
        if (sess.plane === sess.maxPlane) {
            sess.maxPlane += 1;
            sess.plane += 1;
            res.redirect('/game');
        }
        else {
            sess.plane += 1;
            res.redirect('/game');
        }
    }
    else {
        const user = User.findOne({ username: sess.username })
            .exec()
            .then(user => {
                if (user.plane === sess.plane) {
                    User.findByIdAndUpdate(user._id, { $set: { plane: sess.plane + 1 } }, { new: true })
                        .then(user2 => {
                            sess.plane += 1;
                            sess.maxPlane += 1;
                            res.redirect('/game');
                        })
                        .catch(err => {
                            console.log(err);
                        });

                }
                else {
                    sess.plane += 1;
                    res.redirect('/game');
                }
            })
            .catch(err => {
                console.log(err);
            });
    }


});


function compare(a, b) {

    let sA = parseInt(a.score);
    let sB = parseInt(b.score);

    let comparison = 0;
    if (sA > sB) {
        comparison = 1;
    } else if (sA < sB) {
        comparison = -1;
    }
    return comparison * -1;
}

app.post('/result', (req, res, next) => {
    sess = req.session;
    sess.score = 0;
    sess.lives = 3;
    console.log("result");
    Highscore.findOne({ _id: 1 })
        .exec()
        .then(hs => {
            let u = "guest";
            if (sess.username)
                u = sess.username;
            hs.hs.push({ user: u, score: req.body.score })
            let a = hs.hs;
            console.log(a);
            a.sort(compare);
            if (a >= 11)
                a.pop();
            Highscore.findByIdAndUpdate(1, { $set: { hs: a } })
                .then(result => {

                    res.redirect('/');
                });
        });
});

app.post('/selection', (req, res, next) => {
    sess = req.session;
    res.render('selection', { level: sess.maxLevel, plane: sess.maxPlane });
})


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