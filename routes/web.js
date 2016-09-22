const express = require('express');

module.exports = (() => {
    'use strict';
    let router = express.Router();
    console.log('Web router loaded.');
    
    router.get('/', (req, res) => {
	    res.send('Hello!');
    });

    return router;
})();