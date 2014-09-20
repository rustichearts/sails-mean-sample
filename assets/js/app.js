angular.module('polls', ['pollServices'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/polls', {
        templateUrl: 'templates/list.html',
        controller: PollListCtrl
      }).
      when('/poll/:pollId', {
        templateUrl: 'templates/item.html',
        controller: PollItemCtrl
      }).
      when('/new', {
        templateUrl: 'templates/new.html',
        controller: PollNewCtrl }).
      otherwise({ redirectTo: '/polls' });
  }]);