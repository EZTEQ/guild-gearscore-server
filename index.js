const express = require('express');
const app = express();
const cache = require('apicache').middleware;
const wow = require('./wow');

const port = process.env.PORT || 8080;
app.set("port", port);

wow.setApiKey('PLEASE ENTER YOUR BATTLE NET API KEY HERE!');

app.get('/:type/:realm/:guild/:field', cache('5 minutes'), (req, res) => {
	wow.call(req.params, (apiResponse) => {
		res.status(apiResponse.status.code);
		res.json(apiResponse.entity);
	});
});

app.listen(port, () => {
	console.log('Guild Gearscore API listening on port %d...', port);
});