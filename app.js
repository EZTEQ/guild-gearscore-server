/* dependencies, dependencies, dependencies  */
const express = require('express');
const compression = require('compression');
const cors = require('cors');
const logger = require('./log/log');
const api = require('./routes/api');

const app = express();

/* app configuration */
const port = process.env.PORT || 8080;
app.set('port', port);
app.use(logger);
app.use(compression());

if (process.env.CORS === 'true') {
    app.use(cors());
}

/* routing */
app.use('/', api);

/* let's go' */
app.listen(port, () => {
    console.log('Guild Gearscore listening on port %d...', port);
});
