const express = require('express');

module.exports = (() => {
	'use strict';
	let router = express.Router();

	router.get('/', (req, res) => {
		res.render('home');
	});

	router.get('/:realm/:guild', (req, res) => {
		res.render('guild-overview', {
			helpers: {
				title: req.params.guild + ' - ' + req.params.realm,
				realm: req.params.realm,
				guild: req.params.guild
			}
		});
	});

	console.log('Web router loaded.');
	return router;
})();