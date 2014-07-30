var strongpassword = {
    VALIDATIONS: [
        "abcdefghijklmnopqrstuvwxyz",
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        "0123456789",
        "`!?$?%^&*()_-+={[}]:;@'~#|\\<>.?/];"
    ],
    
    // generate strong password
    // size: generated password size
    get: function(size) {
        size = size || 15;
        
        var MAX_SEED = 100;
        var i, result = [], visit = [], map = this.VALIDATIONS.slice(0);
    
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
    },
    
    // validate password is strong
    // password: password for valication
    // threshold: min-length for strong password (default: 10)
    isstrong: function(password, threshold) {
        threshold = threshold || 15;
        
        var check = false, i, j, k;
        if(password.length >= threshold) {
            for(i=0; i<this.VALIDATIONS.length; ++i) {
                for(j=0; j<this.VALIDATIONS[i].length; ++j) {
                    
                    for(k=0; k<password.length; ++k) {
                        check = (this.VALIDATIONS[i][j] === password[k]);
                        if(check) { break; }
                    }
        
                    if(check) { break; }
                }
                
                if(!check) { break; }
            }
        }
        
        return check;
    }
};