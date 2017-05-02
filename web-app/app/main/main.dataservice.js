(function() {
    'use strict';
    angular.module('mydetail.main').factory('MainDataService', MainDataService);

    MainDataService.$inject = ['$q', '$http', 'BASE_URL', 'API_KEY'];

    function MainDataService($q, $http, BASE_URL, API_KEY) {
        var service = {};

        return service;
    }

})();