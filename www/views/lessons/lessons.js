'Use Strict';
angular.module('App').controller('lessonsController', function($scope, $firebaseArray, firebase, $state) {
    $scope.$on('$ionicView.enter', function() {})

    var ref = firebase.database().ref().child("lessons");
    $scope.lessons = $firebaseArray(ref);

    $scope.lessons.$loaded()
        .then(function() {
            console.log($scope.lessons);
        })


});