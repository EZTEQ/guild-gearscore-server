const express = require('express');
const cache = require('apicache').middleware;
const wow = require('../api/wow');

wow.setApiKey(process.env.APIKEY);

module.exports = (() => {
    'use strict';
    let router = express.Router();
    
    router.get('/:type(guild|character)/:realm/:param/:field', cache('60 minutes'), (req, res) => {
	    wow.call(req.params, (apiResponse) => {
            res.status(apiResponse.status.code);
            res.json(apiResponse.entity);
        });
    });

    console.log('API router loaded.');
    return router;
})();