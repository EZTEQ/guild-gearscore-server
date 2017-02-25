const express = require('express');
const blizzard = require('blizzard.js').initialize({ apikey: process.env.APIKEY });
const cache = require('apicache').middleware;

module.exports = (() => {
    const router = express.Router();

    const origin = 'eu';

    router.get('/guildgear/:realm/:name', cache('60 minutes'), (req, res) => {
        const realm = req.params.realm;
        const name = req.params.name;
        const keys = req.query.keys || ['members'];

        blizzard.wow.guild(keys, { realm, name, origin })
            .then((response) => {
                const guildMembers = response.data.members;

                const getAverageItemLevel = member => blizzard.wow.character(['items'], { realm, name: member.character.name, origin });
                const actions = guildMembers.map(getAverageItemLevel);

                Promise.all(actions)
                    .then((members) => {
                        members.forEach((itemLevelResponse, i) => {
                            const character = guildMembers[i].character;
                            const items = itemLevelResponse.data.items;
                            character.averageItemLevel = items.averageItemLevel;
                            character.averageItemLevelEquipped = items.averageItemLevelEquipped;
                        });
                        res.json(response.data);
                    });
            })
            .catch(err => res.status(err.response.status).json(err.response.data));
    });

    console.log('API router loaded.');
    return router;
})();
