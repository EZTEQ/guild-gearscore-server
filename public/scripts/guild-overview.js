function getGuildData(realm, guild) {
    $.get('/api/guild/' + realm + '/' + guild + '/members')
        .done(inflateGuildData)
        .fail(function() {

        });
}

function inflateGuildData(data) {
    $('#guild')
    var members = filterMembers(data);

    members.forEach(function(member) {
        $('#members').append(
            '<div class="ui grid">' +
                '<div class="ten wide column">' +
                    '<span class="ui header">' + member.name + '</span>' +
                    '<p>' + member.spec + '</p>' +
                '</div>' +
                '<div class="right floated two wide column">' +
                    '<div class="ui teal big label" id="' + member.name + '-ilevel"></div>' +
                '</div>' +
            '</div>' +
            '<div class="ui divider"></div>'
        );
    }, this);

    members = injectItemLevel(members);

}

function filterMembers(data) {
    var filteredMembers = [];
    data.members.forEach(function(member) {
        if (member.character.level === 110) {
            var spec = "";
            if (typeof member.character.spec !== "undefined") spec = member.character.spec.name;
            filteredMembers.push({
                name: member.character.name,
                realm: member.character.realm,
                spec: spec
            });
        }
    }, this);
    return filteredMembers;
}

function injectItemLevel(members) {
    members.forEach(function(member) {
        $.get('/api/character/' + member.realm + '/' + member.name + '/items')
        .done(function(data) {
            member.ilevel = data.items.averageItemLevelEquipped;
            $('#' + member.name + '-ilevel').text(data.items.averageItemLevelEquipped);
        });
    }, this);

    return members
}