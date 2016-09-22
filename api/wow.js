/* Battle.net API wrapper */
const rest = require('rest');
const mime = require('rest/interceptor/mime');

const client = rest.wrap(mime);

let _apiKey;

exports.setApiKey = (apiKey) => {
	_apiKey = apiKey;
}

exports.call = (params, callback) => {
	get(params.type + '/' + params.realm + '/' + params.param + '?fields=' + params.field, callback);
}

function get(endPoint, callback) {
	let apiUrl = 'https://eu.api.battle.net/wow/';
	apiUrl += endPoint;
	//apiUrl += '&locale=de_DE';
	apiUrl += '&apikey=' + _apiKey;
	client(apiUrl).then((response) => {
		callback(response);
	});
}