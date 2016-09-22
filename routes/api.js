const express = require('express');
const cache = require('apicache').middleware;
const wow = require('../battle-net/wow');

wow.setApiKey(process.env.APIKEY);

module.exports = (() => {
    'use strict';
    let router = express.Router();
    console.log('API router loaded.');

    router.get('/:type(guild|character)/:realm/:param/:field', cache('15 minutes'), (req, res) => {
	    wow.call(req.params, (apiResponse) => {
            res.status(apiResponse.status.code);
            res.json(apiResponse.entity);
        });
    });

    return router;
})();