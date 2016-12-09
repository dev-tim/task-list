const axios = require('axios');
const uuid = require('node-uuid');
const config = require('../config');

export default function authMiddleware(req, res, next) {
  const {state, code} = req.query;

  if (req.session.accessToken) {
    return next();
  } else if (code) {
    return fetchAccessToken(req, res, code);
  } else {
    res.redirect(`${config.auth.oauthUrl}/authorize?` +
      `client_id=${config.auth.clientId}&` + // assigned clientId
      `redirect_uri=${config.auth.redirectUrl}&` + // env specific redirectUrl
      `state=${uuid.v4()}` // as docs ask we would generate unique state
    );
  }
}

export function fetchAccessToken(req, res, code) {
  axios({
    method: 'POST',
    url: `${config.auth.oauthUrl}/access_token`,
    data: {
      client_id: config.auth.clientId,
      client_secret: config.auth.clientSecret,
      code
    }
  }).then((resp) => {
    console.log('Auth success, received access token');
    req.session.accessToken = resp.data.access_token;
    res.redirect(req.path);
  }).catch((error) => {
    console.error('Authentication error', error.status);
    res.status(403).send({error: 'Authentication Error'})
  });
}
