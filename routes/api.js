const express = require('express');
const cache = require('apicache').middleware;
const wow = require('../api/wow');

module.exports = (() => {
    const router = express.Router(); // eslint-disable-line

    router.get('/:type(guild|character)/:realm/:param/:field', cache('60 minutes'), (req, res) => {
        wow.call(req.params, (apiResponse) => {
            res.status(apiResponse.status);
            res.json(apiResponse.data);
        });
    });

    console.log('API router loaded.');
    return router;
})();
