require('./babel-init-server');

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const authMiddleware = require('./server/auth').default;
const initApiHandlers = require('./server/api');

const config = require('./config');
global = Object.assign(global, config.globalEnv);

const app = express();
app.set('views', './public');
app.set('view engine', 'pug');
app.use(express.static('./dist'));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({secret: 'some random secrect that should be changed in prod'}));
app.use(authMiddleware);


initApiHandlers(app);

app.get('*', function (req, res) {
  res.render('index');
});

app.listen(process.env.PORT ||9000, function (err) {
  if (err) {
    return console.error(err);
  }
  console.log('Listening at http://localhost:9000/');
});
