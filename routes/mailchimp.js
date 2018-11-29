const router = require('express').Router(),
    api = require('../config/api'),
    request = require('request');
const { check, validationResult } = require('express-validator/check');

// Main
router.post('/signup', [
    check('firstName').isAlpha(),
    check('lastName').isAlpha(),
    check('email').isEmail()
], (req, res) => {
    const { firstName, lastName, email } = req.body;

    // Form validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        res.redirect('/fail');
        return;
    }

    // Construct req data
    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }
    // Transform the object data into a string
    const postData = JSON.stringify(data);

    const options = {
        url: api.URL,
        method: 'POST',
        headers: {
            Authorization: api.APIKEY,
        },
        body: postData
    }
    // Request send to MailChimp
    request(options, (err, response, body) => {
        if (err) {
            res.redirect('/fail');
        } else {
            if (response.statusCode === 200) {
                res.redirect('/success');
            } else {
                res.redirect('/fail');
            }
        }
    });
});

router.get('/success', (req, res) => {
    res.sendFile('success.html', { root: __dirname });
});

router.get('/fail', (req, res) => {
    res.sendFile('fail.html', { root: __dirname });
});

module.exports = router;