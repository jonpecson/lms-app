'Use Strict';
angular.module('App').controller('loginController', function($scope, $state, $localStorage, Utils, Popup) {
    $scope.$on('$ionicView.enter', function() {
        //Clear the Login Form.
        $scope.user = {
            email: '',
            password: ''
        };
    })

    $scope.login = function(user) {
        if (angular.isDefined(user)) {
            Utils.show();
            loginWithFirebase(user.email, user.password);
            var username = "Roger Intong"
        }
    };

    $scope.showNotSupported = function() {
        Utils.message(Popup.errorIcon, Popup.fullVersionOnly);
    }


    //Function to login to Firebase using email and password.
    loginWithFirebase = function(email, password) {
        this.email = email;
        this.password = password;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function(response) {
                //Retrieve the account from the Firebase Database
                var userId = firebase.auth().currentUser.uid;
                firebase.database().ref('students').orderByChild('userId').equalTo(userId).once('value').then(function(accounts) {
                    // console.log('Accounts 1:' + accounts);
                    if (accounts.exists()) {

                        accounts.forEach(function(account) {
                            //Account already exists, proceed to home.
                            Utils.hide();
                            firebase.database().ref('students/' + account.key).on('value', function(response) {
                                var account = response.val();
                                console.log('Accounts 2:' + JSON.stringify(account));
                                $localStorage.account = account;
                                $localStorage.loginProvider = "Firebase";
                                $localStorage.email = email;
                                $localStorage.password = password;

                                $state.go('app.home');

                            });

                        });
                    }
                });

            })
            .catch(function(error) {
                var errorCode = error.code;
                showFirebaseLoginError(errorCode);
            });
    }

    //Shows the error popup message when using the Login with Firebase.
    showFirebaseLoginError = function(errorCode) {
        switch (errorCode) {
            case 'auth/user-not-found':
                Utils.message(Popup.errorIcon, Popup.emailNotFound);
                break;
            case 'auth/wrong-password':
                Utils.message(Popup.errorIcon, Popup.wrongPassword);
                break;
            case 'auth/user-disabled':
                Utils.message(Popup.errorIcon, Popup.accountDisabled);
                break;
            case 'auth/too-many-requests':
                Utils.message(Popup.errorIcon, Popup.manyRequests);
                break;
            default:
                Utils.message(Popup.errorIcon, Popup.errorLogin);
                break;
        }
    };


});