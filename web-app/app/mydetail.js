
(function() {
    'use strict';
    angular
        .module('mydetail', [
            'ui.router',
            'ngMessages',
            'mydetail.main',
            'templates'
        ])
        .config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
            function($stateProvider, $urlRouterProvider, $httpProvider) {
                $urlRouterProvider.otherwise('/');

                // Root level route here, all other routes defined in their modules
                $stateProvider
                    // Base Route
                    .state('home', {
                        url: '/',
                        views: {
                            'header': {
                                templateUrl: 'layout/header.html'
                            },
                            'content': {
                                templateUrl: 'layout/content.html'
                            }
                        },
                        data: {
                            contentClasses: 'max-1440'
                        }
                    });
            }
        ])
        .run(['$rootScope', '$state', '$stateParams',
            function($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]);
})();
