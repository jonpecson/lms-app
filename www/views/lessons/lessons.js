'Use Strict';
angular.module('App').controller('lessonsController', function($scope, $firebaseArray, firebase, $state, $localStorage) {
    $scope.$on('$ionicView.enter', function() {})
    $scope.yearLevel = $localStorage.account.yearLevel;
    // $scope.yearLevel = $scope.yearLevel + '' + $scope.yearLevel;
    $scope.yearLevel;
    console.log($scope.yearLevel);
    var ref = firebase.database().ref().child("lessons");
    $scope.lessons = $firebaseArray(ref);

    $scope.lessons.$loaded()
        .then(function() {
            console.log($scope.lessons);
        })
});