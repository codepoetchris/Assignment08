(function (window) {
    'use strict';
    var App = window.App || {};

    var Validation = {
        isCompanyEmail: function (email) {
            return /.+@bignerdranch\.com$/.test(email);
        },
        doesOrderExist: function (email, cb) {
            this.get(email, function (serverResponse) {
                if(serverResponse != null) {
                    cb(true);
                } else {
                    cb(false);
                }
            });
        }
    };

    App.Validation = Validation;
    window.App = App;
})(window);
