const fetch = require('node-fetch');

export default async function Feedback(req, res) {
  if (!req.body || !req.body.message) {
    res.statusCode = 422;
    res.send('');
    return Promise.fail();
  }

  await fetch(process.env.FEEDBACK_URL, {
    method: 'POST',
    body: JSON.stringify({
      message: req.body.message,
      subject: 'Tentacle Feedback',
    }),
    headers: {
      Authorization: process.env.FEEDBACK_SECRET,
      'Content-Type': 'application/json',
    },
  });

  res.statusCode = 201;
  res.send('');
}

export const config = {
  api: {
    bodyParser: true,
  },
};
