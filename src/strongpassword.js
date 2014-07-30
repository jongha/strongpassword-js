var strongpassword = {
    VALIDATIONS: [
        "abcdefghijklmnopqrstuvwxyz", // lower chars
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ", // upper chars
        "0123456789", // number
        "`!?$?%^&*()_-+={[}]:;@'~#|\\<>.?/];" //special chars
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
    
    // get strong point
    // 0: week
    // VALIDATIONS.length: strong
    // customlist: Custom validation list.
    point: function(password, customlist) {
        var i, j, k, points = [], vlist = customlist || this.VALIDATIONS;
        
        for(i=0; i<vlist.length; ++i) {
            points.push(false);
            
            for(j=0; j<vlist[i].length; ++j) {
                
                for(k=0; k<password.length; ++k) {
                    if(points[i]) { break; }
                    points[i] = (vlist[i][j] === password[k]);
                }
            }
        }
        
        var sum = 0;
        for(i=0; i<vlist.length; ++i) {
            sum += points[i] ? 1 : 0;
        }
        
        return sum;
    },
    
    // validate password is strong
    // password: password for valication
    // threshold: min-length for strong password (default: 10)
    isstrong: function(password, threshold) {
        threshold = threshold || 15;
        if(password.length >= threshold) {
            return this.point(password) === this.VALIDATIONS.length;
        }
        
        return false;
    }
};