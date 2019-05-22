const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const promisify = require('es6-promisify');
const flash = require('connect-flash');
const expressValidator = require('express-validator');
// const routes = require('./routes/index');
// const helpers = require('./helpers');

// const errorHandlers = require('./handlers/errorHandlers');
// require('./handlers/passport');

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// serves up static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Exposes methods for validating data
// app.use(expressValidator());


// populates req.cookies
app.use(cookieParser());

// allows us to send flash messages
app.use(session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// Passport JS is what we use to handle our logins
app.use(passport.initialize());
app.use(passport.session());

// flash middleware
app.use(flash());

// pass variables to our templates for all requests
app.use((req, res, next) => {
   res.locals.h = helpers;
   res.locals.flashes = req.flash();
   req.locals.user = req.user || null;
   res.locals.currentPath = req.path;
   next();
});

// promisify some ccallback based APIS
app.use((req, res, next) => {
   req.login = promisify(req.login, req);
   next();
});

// app.use('/', routes);


// If above routes don't work, forward request to error handler
app.use(errorHandlers.notFound);

// if just validation error
app.use(errorHandlers.flashValidationErrors);

if (ap.get('env') === 'development') {
    app.use(errorHandlers.developmentErrors);
}

app.use(errorHandlers.productionErrors);

module.exports = app;

app.get('/', (req, res) => {
    res.send('test');
});



app.listen(3000, () => {
    console.log('Server running on port 3000');
})