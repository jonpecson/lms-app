'Use Strict';
angular.module('App').controller('homeController', function($scope, $state, $localStorage, Popup) {
    $scope.$on('$ionicView.enter', function() {
        //Authentication details.
        console.log("Firebase Auth: " + JSON.stringify(firebase.auth().currentUser));
        //Account details.
        console.log("Account: " + JSON.stringify($localStorage.account));
        //Set the variables to be shown on home.html
        $scope.email = $localStorage.account.email;
        $scope.provider = $localStorage.account.provider;
        $scope.displayName = $localStorage.account.displayName;
        $scope.yearLevel = $localStorage.account.yearLevel;
    })

    $scope.logout = function() {
        if (firebase.auth()) {
            firebase.auth().signOut().then(function() {
                //Clear the saved credentials.
                $localStorage.$reset();
                //Proceed to login screen.
                $state.go('login');
            }, function(error) {
                //Show error message.
                Utils.message(Popup.errorIcon, Popup.errorLogout);
            });
        }
    };
});