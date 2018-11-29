const express = require('express'),
    path = require('path'),
    fs = require('fs'),
    morgan = require('morgan'),
    logger = require('morgan'),
    mailChimp = require('./routes/mailchimp'),
    config = require('./config/config'),
    app = express();

// Create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logger/access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));
// Only log error responses
// app.use(morgan('combined', { skip: (req, res) => { return res.statusCode < 400 } }));

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Main path
app.use('/', mailChimp);

// Port
app.listen(config.PORT, () => console.log(`Server listen on port: ${config.PORT}`));