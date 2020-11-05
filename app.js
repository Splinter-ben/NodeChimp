require('colors');

const express = require('express'),
  path = require('path'),
  morgan = require('morgan'),
  mailChimp =  require('./routes/mailchimp');
  PORT = process.env.PORT,
  app = express();

// parse application/x-www-form-urlencoded, basically can only parse incoming Request Object if strings or arrays
app.use(express.urlencoded({ extended: true }));

// Morgan Logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Main path
app.use('/', mailChimp);

// Port
const server = app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode, on port: ${PORT}`.yellow
      .bold
  )
);