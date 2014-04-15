(function() {

    var map = [
        "abcdefghijklmnopqrstuvwxyz",
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        "0123456789",
        "`!?$?%^&*()_-+={[",
        "}]:;@'~#|\\<>.?/];"
    ];

    var validpassword = function(map, password) {
        var check, i, j, k;
        for(i=0; i<map.length; ++i) {
            check = false;
            
            for(j=0; j<map[i].length; ++j) {
                
                for(k=0; k<password.length; ++k) {
                    check = (map[i][j] === password[k]);
                    if(check) { break; }
                }

                if(check) { break; }
            }
            
            if(!check) { break; }
        }
        
        return check;
    };
    
    var length = [null, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30];
    var testcase = function(size) {
        test("Strong Password (length: " + size + ")", function() {
            size = size || 15;
            
            var password1 = strong_password(size);
            var password2 = strong_password(size);
            
            equal(password1.length, size, "Default length " + size + " check");
            equal(password2.length, size, "Default length " + size + " check");
            notEqual(password1, password2, "Previous passwords check");
            
            equal(validpassword(map, password1), true, "Password validation check");
            equal(validpassword(map, password2), true, "Password validation check");
        });
    };
    
    for(var l in length) {
        testcase(length[l]);
    }

    
}(jQuery));
