    'use strict';


// Declare app level module which depends on filters, and services
angular.module('alveolus',
    ['alveolus.filters',
    'ngCookies',
    'alveolus.webappService',
    'alveolus.categoryService',
    'alveolus.commentService',
    'alveolus.sessionService',
    'alveolus.socialService', 
    'alveolus.feedbackService', 
    'alveolus.userService', 
    'alveolus.tagService', 
    'alveolus.directives', 
    'alveolus.homeCtrl', 
    'alveolus.mainCtrl', 
    'alveolus.webappCtrl', 
    'alveolus.addWebappCtrl',
    'alveolus.editWebappCtrl',
    'alveolus.userCtrl',
    'alveolus.webAppListCtrl',
    'alveolus.voteCtrl',
    'ui.bootstrap'
    ]).
config(
  ['$routeProvider','$httpProvider', function($routeProvider, $httpProvider) {
    $routeProvider.
    when('/user', {templateUrl: 'partials/user.html',   controller: 'UserCtrl'}).
    when('',                            {templateUrl: 'partials/home.html',             controller: 'HomeCtrl'}).
    when('/alveoles/new',               {templateUrl: 'partials/addWebapp.html',        controller: 'AddWebappCtrl'}).
    when('/alveoles/search/:content',   {templateUrl: 'partials/webAppList.html',       controller: 'WebAppListCtrl'}).
    when('/alveoles/:webAppId',         {templateUrl: 'partials/webAppDesc.html',       controller: 'WebappCtrl'}).
    when('/alveoles/:webAppId/edit',    {templateUrl: 'partials/editWebApp.html',       controller: 'EditWebappCtrl'}).
    when('/webappModal/:webAppId',      {templateUrl: 'partials/webAppModal.html',      controller: 'WebappCtrl'}).
    when('/alveoles',                   {templateUrl: 'partials/webAppList.html',       controller: 'WebAppListCtrl'}).
    when('/user/:userId',               {templateUrl: 'partials/user.html',             controller: 'UserCtrl'}).
    when('/vote',                       {templateUrl: 'partials/vote.html',             controller: 'VoteCtrl'}).
    otherwise({redirectTo: '/',          templateUrl: 'partials/home.html',             controller: 'HomeCtrl'}); 

    var interceptor = ['$location', '$q','$rootScope', function ($location, $q, $rootScope) {
        return function (promise) {
            return promise.then(function (response) {
                return response;
            }, function (response) {
                if(response.status === 401) {
                    $location.path('/');
                    console.log("catch 401 : cast broadcastNeedLogin, and redirect main page");
                    $location.path('/');
                    $rootScope.$broadcast('onNeedLogin');
                    return $q.reject(response);
                }
                else {
                    return $q.reject(response);
                }
            });
        };
    }]
    
    $httpProvider.responseInterceptors.push(interceptor);

}]).value('globals',{server_url : 'http://quiet-spire-4994.herokuapp.com'});

