/* Battle.net API wrapper */
const RateLimiter = require('limiter').RateLimiter;
const blizzard = require('blizzard.js').initialize({ apikey: process.env.APIKEY });

const limiter = new RateLimiter(90, 'second');

exports.call = (params, callback) => {
    limiter.removeTokens(1, () => {
        const argsObject = { realm: params.realm, name: params.param, origin: 'eu' };

        switch (params.type) {
        case 'character':
            blizzard.wow.character(['items'], argsObject)
            .then((response) => {
                callback(response.data);
            });
            break;
        case 'guild':
        default:
            blizzard.wow.guild(['members'], argsObject)
                .then((response) => {
                    callback(response);
                })
                .catch((reason) => {
                    console.log(reason);
                });
            break;
        }
    });
};
