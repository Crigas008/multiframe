angular.module('myApp')
    .controller('MainCtrl', ['$scope', '$http', function($scope, $http) {
        // Initialize data
        $scope.todos = JSON.parse(localStorage.getItem('angular-todos')) || [];
        $scope.newTodo = {
            text: '',
            description: '',
            date: new Date()
        };
        $scope.posts = [];
        
        // Format date for display
        $scope.formatDate = function(date) {
            return date ? new Date(date).toISOString().split('T')[0] : '';
        };
        
        // Load posts
        $http.get('https://jsonplaceholder.typicode.com/posts?_limit=100')
            .then(function(response) {
                $scope.posts = response.data;
            });
        
        // Methods
        $scope.addTodo = function() {
            if ($scope.newTodo.text.trim()) {
                $scope.todos.push({
                    id: Date.now(),
                    text: $scope.newTodo.text,
                    description: $scope.newTodo.description,
                    date: $scope.formatDate($scope.newTodo.date),
                    completed: false,
                    imageUrl: ''
                });
                $scope.saveTodos();
                $scope.newTodo.text = '';
                $scope.newTodo.description = '';
            }
        };
        
        $scope.removeTodo = function(id) {
            $scope.todos = $scope.todos.filter(todo => todo.id !== id);
            $scope.saveTodos();
        };
        
        $scope.toggleComplete = function(id) {
            $scope.todos = $scope.todos.map(todo => 
                todo.id === id ? {...todo, completed: !todo.completed} : todo
            );
            $scope.saveTodos();
        };
        
        $scope.fetchRandomImage = function(id) {
            // Используем прямой URL вместо Blob
            const randomId = Math.floor(Math.random() * 1000);
            const url = `https://picsum.photos/id/${randomId}/200/300`;
            
            $scope.todos = $scope.todos.map(todo => 
                todo.id === id ? {...todo, imageUrl: url} : todo
            );
            $scope.saveTodos();
        };
        
        $scope.saveTodos = function() {
            localStorage.setItem('angular-todos', JSON.stringify($scope.todos));
        };
    }]);