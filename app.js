/* dependencies, dependencies, dependencies  */
const express = require('express')
const app = express();
const cache = require('apicache').middleware;
const compression = require('compression');
const logger = require('./log/log');

/* view engine */
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.enable('view cache');

/* app configuration */
const port = process.env.PORT || 8080;
app.set('port', port);
app.use(logger);
app.use(compression());
app.use(express.static('./public'));

/* routing */
const api = require('./routes/api');
app.use('/', api);

/* let's go' */
app.listen(port, () => {
	console.log('Guild Gearscore listening on port %d...', port);
});
