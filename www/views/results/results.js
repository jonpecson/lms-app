'Use Strict';
angular.module('App').controller('resultsController', function($scope, $firebaseArray, firebase, $localStorage, $filter) {
    // $scope.$on('$ionicView.enter', function() {
    //     console.log($stateParams.lessonId);
    // })

    var ref = firebase.database().ref().child("results");
    $scope.results = $firebaseArray(ref);
    var email = $localStorage.account.email;

    $scope.results.$loaded()
        .then(function() {
            // Filter all result by Email
            console.log(email);
            $scope.localResults = $filter('filter')($scope.results, { email: email });
        })
});