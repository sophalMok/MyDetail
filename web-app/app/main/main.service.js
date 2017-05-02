(function() {
    'use strict';
    angular.module('mydetail.main').factory('MainService', MainService);

    MainService.$inject = ['PROJECT_NAME', 'MainDataService'];

    function MainService(PROJECT_NAME, MainDataService) {
        var service = {};
        return service;
    }

})();