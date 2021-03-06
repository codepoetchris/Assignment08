/*eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

(function (window) {
    'use strict';
    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
    // var SERVER_URL = 'http://localhost:3002/coffeeorders';
    var App = window.App;
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    // var RemoteDataStore = App.RemoteDataStore;
    var FormHandler = App.FormHandler;
    var Validation = App.Validation;
    var CheckList = App.CheckList;
    // var remoteDS = new RemoteDataStore(SERVER_URL);
    var myTruck = new Truck('ncc-1701', new DataStore());
    window.myTruck = myTruck;
    var checkList = new CheckList(CHECKLIST_SELECTOR);
    checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
    var formHandler = new FormHandler(FORM_SELECTOR);

    formHandler.addSubmitHandler(function (data) {
        return myTruck.createOrder.call(myTruck, data)
            .then(function () {
                checkList.addRow.call(checkList, data);
            });
    });

    formHandler.addInputHandler(Validation.isCompanyEmail);

    myTruck.printOrders(checkList.addRow.bind(checkList));

    //The only issue with this is that it won't currently work with the
    //old offline DataStore.  The get method would need to be modified
    //to support a callback function that returns the the item if it exits.
    // formHandler.addOrderExistsHandler(Validation.doesOrderExist.bind(remoteDS));

})(window);
