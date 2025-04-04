const dotenv = require('dotenv');
const env = process.env.NODE_ENV || 'dev';
dotenv.config({ path: `.env.${env}` });
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');

const config = require('./config');
const userRoutes = require('./routes');

const app = express();

let sessionOptions = {
    secret: config.USER_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600 },
    store: MongoStore.create({ mongoUrl: `${config.env.mongoUrl}` })
};

app.server = http.createServer(app);

// url and json encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: config.bodyLimit }));

// cookie and morgan
app.use(cookieParser());
if (app.get('env') !== 'test') {
    app.use(morgan('combined'));
}

// Allow cross origin on a different port
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
});

// Session middleware
if (app.get('env') === 'production') {
    app.set('Trust proxy', 1);
    sessionOptions.cookie.secure = true;
} else {
    sessionOptions.cookie.secure = false;
}
app.use(session(sessionOptions));
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

// req/res log middleware
app.use((req, res, next) => {
    const reqStart = Date.now();
    let requestErrorMessage = null;
    let body = [];

    const getChunk = chunk => body.push(chunk);
    const assembleBody = () => {
        body = Buffer.concat(body).toString();
    };
    const getError = error => {
        requestErrorMessage = error.message;
    };

    req.on("data", getChunk);
    req.on("end", assembleBody);
    req.on("error", getError);

    const logClose = () => {
        removeHandlers();
        log(req, res, "Client aborted.");
    };

    const logError = error => {
        removeHandlers();
        log(req, res, error.message);
    };

    const logFinish = () => {
        removeHandlers();
        log(req, res, requestErrorMessage);
    };

    res.on("close", logClose);
    res.on("error", logError);
    res.on("finish", logFinish);

    const removeHandlers = () => {
        req.off("data", getChunk);
        req.off("end", assembleBody);
        req.off("error", getError);
        res.off("close", logClose);
        res.off("error", logError);
        res.off("finish", logFinish);
    };

    const log = (req, res, errorMessage) => {
        const { rawHeaders, httpVersion, method, socket, url } = req;
        const { remoteAddress, remoteFamily } = socket;
        const { statusCode, statusMessage } = res;
        const headers = res.getHeaders();

        const outputMessage = {
            "Timestamps": moment().format('MMMM Do YYYY, h:mm:ss'),
            "Processing Time": Date.now() - reqStart,
            "Raw Headers": rawHeaders,
            "Body": body,
            "Error Message": errorMessage,
            "HTTP Version": httpVersion,
            "Method": method,
            "Remote Address": remoteAddress,
            "Remote Family": remoteFamily,
            "URL": url,
            "Response": {
                statusCode,
                statusMessage,
                headers
            }
        }
        
        console.log(outputMessage);
    };
    next();
});

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./middleware/passport')(passport);

// db connection
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error: '));
db.once('open', function callback() {
    console.log(`Successfully connected to MongoDB on ${config.env.envName} server!`);
});

// routes
app.use(`/api/v1/users`, userRoutes);

app.server.listen(config.env.port, () => {
    console.log(`Server listening on port ${config.env.port} in ${config.env.envName} environment`);
});

module.exports = app;