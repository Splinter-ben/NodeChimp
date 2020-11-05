const mailChimRouter = require('express').Router();
const { check, validationResult } = require('express-validator/check');
const { signupUser } = require('../controller/mailchimp.ctrl');
const path = require('path');

// POST signup the new user
mailChimRouter.route(
  '/signup',
  [
    check('firstName').isAlpha(),
    check('lastName').isAlpha(),
    check('email').isEmail(),
  ],
  (req, res) => {
    // Form validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      res.redirect('/fail');
      return;
    }
  }
).post(signupUser);

// GET redirect to the success page
mailChimRouter.get('/success', (req, res) => {
  res.sendFile(path.resolve('success.html'), { root: __dirname });
});

// GET redirect to the fail page
mailChimRouter.get('/fail', (req, res) => {
  res.sendFile('fail.html', { root: __dirname });
});

module.exports = mailChimRouter;
