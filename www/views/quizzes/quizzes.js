'Use Strict';
angular.module('App').controller('quizzesController', function($scope, $firebaseArray, firebase, $state, $localStorage) {
    $scope.$on('$ionicView.enter', function() {})

    $scope.yearLevel = $localStorage.account.yearLevel;
    $scope.yearLevel = $scope.yearLevel + '' + $scope.yearLevel;

    var ref = firebase.database().ref().child("quizzes");
    $scope.quizzes = $firebaseArray(ref);

    $scope.quizzes.$loaded()
        .then(function() {
            console.log($scope.quizzes);
        })


});