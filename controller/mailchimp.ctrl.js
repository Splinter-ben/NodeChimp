const request = require('request');

// @desc    SIGNUP a new user
// @route   POST /api/v1/signup
// @access  Public
exports.signupUser = (req, res) => {
  const { firstName, lastName, email } = req.body;

  // Request Data
  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  // Transform the object data into a string
  const postData = JSON.stringify(data);
  const options = {
    url: `${process.env.URL}/${process.env.LIST_ID}`,
    method: 'POST',
    headers: {
      Authorization: `auth ${process.env.APIKEY}`,
    },
    body: postData,
  };

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
};
