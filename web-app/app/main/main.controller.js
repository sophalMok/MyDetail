(function() {
    'use strict';
    angular.module('mydetail.main').controller('MainController', MainController);

    MainController.$inject = ['MainService'];

    function MainController(MainService) {
        var vm = this;

        initialize();

        function initialize() {
            vm.isProgress = true;
            vm.isOptionSelected = false;
            vm.model = {};
            vm.model.results = {};
            vm.projectNames = MainService.projectNames;
            vm.envNames = MainService.envNames;
            vm.showErrorBanner = false;
            vm.getIP = getIP;
            vm.hideErrorBanner = hideErrorBanner;
        }

        function showErrorBanner(msg) {
            vm.errorBannerMsg = ''.concat("Error: ", msg.description);
            vm.showErrorBanner = true;
        }

        function hideErrorBanner() {
            vm.showErrorBanner = false;
        }
    }

})();