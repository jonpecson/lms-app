'Use Strict';
angular.module('App', ['ionic', 'ngStorage', 'firebase'])
    //Constants for the Popup messages
    //For the icons, refer to http://ionicons.com for all icons.
    //Here you can edit the success and error messages on the popups.
    .constant('Popup', {
        delay: 3000, //How long the popup message should show before disappearing (in milliseconds -> 3000 = 3 seconds).
        successIcon: "ion-happy-outline",
        errorIcon: "ion-sad-outline",
        accountCreateSuccess: "Congratulations! Your account has been created. Logging you in.",
        emailAlreadyExists: "Sorry, but an account with that email address already exists. Please register with a different email and try again.",
        accountAlreadyExists: "Sorry, but an account with the same credential already exists. Please check your account and try again.",
        emailNotFound: "Sorry, but we couldn\'t find an account with that email address. Please check your email and try again.",
        userNotFound: "Sorry, but we couldn\'t find a user with that account. Please check your account and try again.",
        invalidEmail: "Sorry, but you entered an invalid email. Please check your email and try again.",
        notAllowed: "Sorry, but registration is currently disabled. Please contact support and try again.",
        serviceDisabled: "Sorry, but logging in with this service is current disabled. Please contact support and try again.",
        wrongPassword: "Sorry, but the password you entered is incorrect. Please check your password and try again.",
        accountDisabled: "Sorry, but your account has been disabled. Please contact support and try again.",
        weakPassword: "Sorry, but you entered a weak password. Please enter a stronger password and try again.",
        errorRegister: "Sorry, but we encountered an error registering your account. Please try again later.",
        passwordReset: "A password reset link has been sent to: ",
        errorPasswordReset: "Sorry, but we encountered an error sending your password reset email. Please try again later.",
        errorLogout: "Sorry, but we encountered an error logging you out. Please try again later.",
        sessionExpired: "Sorry, but the login session has expired. Please try logging in again.",
        errorLogin: "Sorry, but we encountered an error logging you in. Please try again later.",
        welcomeBack: "Welcome back! It seems like you should still be logged in. Logging you in now.",
        manyRequests: "Sorry, but we\'re still proccessing your previous login. Please try again later.",
        fullVersionOnly: "Sorry, but this feature is not available on the Lite version. Upgrade to Full version in order to use Social Login."
    })
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'views/menu/menu.html',
                controller: 'menuController'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'views/login/login.html',
                controller: 'loginController'
            })
            .state('forgotPassword', {
                url: '/forgotPassword',
                templateUrl: 'views/forgotPassword/forgotPassword.html',
                controller: 'forgotPasswordController'

            })
            .state('register', {
                url: '/register',
                // views: {
                //     'menuContent': {
                templateUrl: 'views/register/register.html',
                controller: 'registerController'
                    //     }
                    // }

            })
            .state('app.home', {
                url: '/home',
                views: {
                    'menuContent': {
                        templateUrl: 'views/home/home.html',
                        controller: 'homeController'
                    }
                }

            })

        .state('app.lessons', {
            url: '/lessons',
            views: {
                'menuContent': {
                    templateUrl: 'views/lessons/lessons.html',
                    controller: 'lessonsController'
                }
            }

        })

        .state('app.lesson-detail', {
            url: '/lessons/:lessonId',
            views: {
                'menuContent': {
                    templateUrl: 'views/lessons/lesson-detail.html',
                    controller: 'lessonDetailController'
                }
            }

        })

        .state('app.quizzes', {
            url: '/quizzes',
            views: {
                'menuContent': {
                    templateUrl: 'views/quizzes/quizzes.html',
                    controller: 'quizzesController'
                }
            }

        })

        .state('app.quiz-detail', {
            url: '/quizzes/:quizId',
            views: {
                'menuContent': {
                    templateUrl: 'views/quizzes/quiz-detail.html',
                    controller: 'quizDetailController'
                }
            }

        })

        .state('app.results', {
            url: '/results',
            views: {
                'menuContent': {
                    templateUrl: 'views/results/results.html',
                    controller: 'resultsController'
                }
            }

        })
        $urlRouterProvider.otherwise("/login");
    });