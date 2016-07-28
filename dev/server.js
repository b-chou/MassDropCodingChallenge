
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static('dev/client'));

require('./routes.js')(app, express);

app.listen(3000, () => console.log('Listening on Port 3000'));

module.exports = app;