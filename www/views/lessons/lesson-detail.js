
'Use Strict';
angular.module('App').controller('lessonDetailController', function($scope, $stateParams, $firebaseArray, firebase, $state) {
    var id = $stateParams.lessonId;
    var ref = firebase.database().ref().child("lessons");
    $scope.lessons = $firebaseArray(ref);
    $scope.lesson = {};

    $scope.lessons.$loaded()
        .then(function() {
            $scope.lesson = $scope.lessons.$getRecord(id);
        })



});