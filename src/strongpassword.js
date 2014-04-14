"use strict"

function strong_password(size) {
    var MAX_SEED = 100;
    var i, result = [], visit = [], map = [
        "abcdefghijklmnopqrstuvwxyz",
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        "0123456789",
        "`!\?$?%^&*()_-+={[",
        "}]:;@'~#|\\<>.?/];"
        ];

    while(size-- > 0) {
        if(visit.length === 0) {
            visit = [];
            for(i=0; i<map.length; ++i) {
                visit.push(i);
            }
        }

        var idx = parseInt(Math.random() * MAX_SEED) % visit.length;
        var map_index = visit[idx];
        var code = map[map_index][parseInt(Math.random() * MAX_SEED) % map[map_index].length];

        result.push(code);

        map[map_index] = map[map_index].replace(code, "");
        visit = visit.slice(0, idx).concat(visit.slice(idx + 1, visit.length));
    }

    return result.join("");
}