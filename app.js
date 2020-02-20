var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var passport = require('passport');
var authenticate = require('./authenticate');

var cors = require('cors');

const url = 'mongodb://localhost:27017/eve';
const connect = mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

connect.then((db) => {
   
}, (err) => { console.log(err); });

var journalRouter = require('./routes/journals');
var userRouter = require('./routes/users');
var vaultRouter = require('./routes/vaults');
var uploadRouter = require('./routes/upload');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    name: 'session-id',
    secret: 'mysessionkey',
    saveUninitialized: false,
    resave: false,
    store: new FileStore()
}));

app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
app.use('*', cors({
    origin: 'http://localhost:4000',
    credentials: true
}));

app.use('/journals', journalRouter);
app.use('/users', userRouter);
app.use('/uploads', uploadRouter);
app.use('/vaults', vaultRouter);
module.exports = app;