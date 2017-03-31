/*eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    FormHandler.prototype.addSubmitHandler = function (fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function (event) {
            event.preventDefault();

            var data = {};
            $(this).serializeArray().forEach(function (item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });
            console.log(data);
            fn(data)
              .then(function () {
                  this.reset();
                  this.elements[0].focus();
              }.bind(this));
        });
    };

    FormHandler.prototype.addInputHandler = function (fn) {
        console.log('Setting input handler for form');
        this.$formElement.on('input', '[name="emailAddress"]', function (event) {
            var emailAddress = event.target.value;
            var message = '';
            if (fn(emailAddress)) {
                event.target.setCustomValidity('');
            } else {
                message = emailAddress + ' is not an authorized email address!';
                event.target.setCustomValidity(message);
            }
        });
    };

    //In reality I would probably combine this method with the addInputHandler
    //method above and just pass in the customValidity message.
    FormHandler.prototype.addOrderExistsHandler = function (fn) {
        console.log('Setting order exists handler for form');
        this.$formElement.on('input', '[name="emailAddress"]', function (event) {
            var emailAddress = event.target.value;
            var message = '';
            fn(emailAddress, function (orderExists) {
                if(orderExists) {
                    message = emailAddress + ' already has an order in place.';
                    event.target.setCustomValidity(message);
                } else {
                    event.target.setCustomValidity('');
                }
            });
        });
    };

    App.FormHandler = FormHandler;
    window.App = App;

})(window);
