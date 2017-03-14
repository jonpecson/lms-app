
'Use Strict';
angular.module('App').controller('quizzesController', function($scope, $firebaseArray, firebase, $state) {
    $scope.$on('$ionicView.enter', function() {})

    var ref = firebase.database().ref().child("quizzes");
    $scope.quizzes = $firebaseArray(ref);

    $scope.quizzes.$loaded()
        .then(function() {
            console.log($scope.quizzes);
        })


});