(function() {

    var length = [null, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30];
    var testcase = function(size) {
        test("Strong Password (length: " + size + ")", function() {
            size = size || 15;
            
            var password1 = strongpassword.get(size);
            var password2 = strongpassword.get(size);
            
            equal(password1.length, size, "Default length " + size + " check");
            equal(password2.length, size, "Default length " + size + " check");
            notEqual(password1, password2, "Previous passwords check");
            
            equal(strongpassword.isstrong(password1, size), true, "Password validation check");
            equal(strongpassword.isstrong(password2, size), true, "Password validation check");
        });
    };
    
    for(var l in length) {
        testcase(length[l]);
    }

    
}(jQuery));
