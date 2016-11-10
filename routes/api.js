const express = require('express');
const cache = require('apicache').middleware;
const wow = require('../api/wow');

module.exports = (() => {
    const router = express.Router(); // eslint-disable-line

    router.get('/:type(guild|character)/:realm/:param/:field', cache('60 minutes'), (req, res) => {
        wow.call(req.params,
            (response) => {
                res.status(response.status);
                res.json(response.data);
            },
            (error) => {
                // TODO Add logging
                res.status(error.response.status);
                res.json(error.response.data);
            });
    });

    console.log('API router loaded.');
    return router;
})();
