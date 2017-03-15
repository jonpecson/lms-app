// login.js
// This is the controller that handles the logging in of the user through Firebase ONLY.
// This is the LITE version and logging in through Social accounts is not supported. Purchase the FULL version at http://bit.ly/2ad466m
// Intelligent Login System is also not available on the Lite version.
// Intelligent Login System is a mechanism placed that if the user is previously logged in and the app is closed, the user is automatically logged back in whenever the app is reopened.
'Use Strict';
angular.module('App').controller('quizDetailController', function($scope, $stateParams, $firebaseArray, firebase, $state, $ionicPopup, $localStorage) {
    // $scope.$on('$ionicView.enter', function() {
    //     console.log($stateParams.lessonId);
    // })

    var id = $stateParams.quizId;
    var ref = firebase.database().ref().child("quizzes");
    $scope.quizzes = $firebaseArray(ref);
    $scope.quiz = {};
    $scope.showResult = false;


    var ref = firebase.database().ref().child("results");
    $scope.results = $firebaseArray(ref);
    var result = {};
    var total = 0;
    var topic = "";

    $scope.quizzes.$loaded()
        .then(function() {
            $scope.quiz = $scope.quizzes.$getRecord(id);
            console.log($scope.quiz);
            total = $scope.quiz.questions.length;
            topic = $scope.quiz.topic;
        })

    $scope.checkResult = function() {
        var score = 0;
        var alertPopup = {};
        $scope.showResult = true;

        $scope.quiz.questions.forEach(function(q) {
            console.log(q)
            if (q.selected == q.correct) {
                score = score + 1;
            }
        }, this);

        console.log("Quiz title: " + $scope.quiz.topic);
        console.log("Name:" + result.displayName);
        console.log("You got " + score + " points");
        console.log("Yearlevel: " + $localStorage.account.yearLevel);


        if (score < $scope.quiz.passingScore) {
            console.log("You failed. Please take the quiz again.");
            status = "Failed";
            alertPopup = $ionicPopup.alert({
                title: 'You\'ve failed the quiz',
                template: 'You\'ve only got ' + score + ' out of ' + total + ' points.'
            });
        } else {
            console.log("Congratulations. You passed the exam");
            status = "Passed";
            alertPopup = $ionicPopup.alert({
                title: 'Congratulations',
                template: 'You\'ve got ' + score + ' out of ' + total + ' points.'
            });
        }

        alertPopup.then(function(res) {
            console.log('Thank you for not eating my delicious ice cream cone');
        });

        result.status = status;
        result.email = $localStorage.account.email;
        result.displayName = $localStorage.account.displayName;
        result.yearLevel = $localStorage.account.yearLevel;
        result.score = score;
        result.topic = topic;
        result.total = total;
        result.date = Date();

        $scope.results.$add(result);
        // $state.go('app.quizzes');
    }
});