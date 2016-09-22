'use strict';

const app = require('express')();
const cache = require('apicache').middleware;
const compression = require('compression');
const logger = require('./log/log');
const wow = require('./battle-net/wow');

const port = process.env.PORT || 8080;
app.set("port", port);

app.use(logger);
app.use(compression());

const api = require('./routes/api');
app.use('/api', api);
const web = require('./routes/web');
app.use('/', web);

app.listen(port, () => {
	console.log('Guild Gearscore API listening on port %d...', port);
});