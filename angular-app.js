angular.module('myApp', [])
    .controller('MainCtrl', ['$scope', function($scope) {
        // Initialize data
        $scope.todos = JSON.parse(localStorage.getItem('angular-todos')) || [];
        $scope.newTodo = '';
        $scope.clickCount = parseInt(localStorage.getItem('angular-clicks')) || 0;
        $scope.posts = [];
        
        // Todo functionality
        $scope.addTodo = function() {
            if ($scope.newTodo.trim()) {
                $scope.todos.push($scope.newTodo);
                localStorage.setItem('angular-todos', JSON.stringify($scope.todos));
                $scope.newTodo = '';
            }
        };
        
        // Click counter
        $scope.incrementClick = function() {
            $scope.clickCount++;
            localStorage.setItem('angular-clicks', $scope.clickCount);
        };
        
        // Fetch posts
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => {
                $scope.$apply(() => {
                    $scope.posts = data;
                });
            });
    }]);