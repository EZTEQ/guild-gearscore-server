const express = require('express');

module.exports = (() => {
	'use strict';
	let router = express.Router();

	router.get('/', (req, res) => {
		res.render('home', {
			helpers: {
				title: 'Home'
			}
		});
	});

	console.log('Web router loaded.');
	return router;
})();