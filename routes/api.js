const express = require('express');
const Bottleneck = require('bottleneck');

const blizzard = require('blizzard.js').initialize({ apikey: process.env.APIKEY });
const cache = require('apicache').middleware;

const limiter = new Bottleneck(40, 15); // 40 requests concurrent, 1 request every 15ms

const MAXLVL = 110;

module.exports = (() => {
    const router = express.Router();

    const origin = 'eu';

    router.get('/guildgear/:realm/:name', cache('60 minutes'), (req, res) => {
        const realm = req.params.realm;
        const name = req.params.name;
        const keys = req.query.keys || ['members'];

        blizzard.wow.guild(keys, { realm, name, origin })
            .then((response) => {
                const guildRes = response.data;
                guildRes.members = guildRes.members.filter(x => x.character.level === MAXLVL);
                const guildMembers = guildRes.members;

                const getAverageItemLevel = (member) => {
                    const cRealm = member.character.realm;
                    const cName = member.character.name;
                    return blizzard.wow.character(['items'], { realm: cRealm, name: cName, origin });
                };
                const actions = guildMembers.map(member => limiter.schedule(getAverageItemLevel, member));

                Promise.all(actions)
                    .then((members) => {
                        members.forEach((itemLevelResponse, i) => {
                            const character = guildMembers[i].character;
                            const items = itemLevelResponse.data.items;
                            character.averageItemLevel = items.averageItemLevel;
                            character.averageItemLevelEquipped = items.averageItemLevelEquipped;
                        });
                        res.json(guildRes);
                    })
                    .catch((reason) => {
                        console.log(reason);
                    });
            })
            .catch(err => res.status(err.response.status).json(err.response.data));
    });

    console.log('API router loaded.');
    return router;
})();
