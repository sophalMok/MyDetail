
    (function() {
        'use strict';
        angular.module('mydetail.main', ['mydetail.common.config'])
            .config(['$stateProvider', function($stateProvider) {
                $stateProvider.state('mydetail.main', {
                    url: 'main/',
                    views: {
                        'content@': {
                            templateUrl: 'main/main.html',
                            controller: 'MainController',
                            controllerAs: 'mainCtrl'
                        }
                    }
                });
            }]);
    }());