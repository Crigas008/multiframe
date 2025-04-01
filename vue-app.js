const { createApp } = Vue;

const vueApp = createApp({
    data() {
        return {
            todos: JSON.parse(localStorage.getItem('vue-todos')) || [],
            newTodo: {
                text: '',
                description: '',
                date: new Date().toISOString().slice(0, 10)
            },
            posts: []
        }
    },
    methods: {
        addTodo() {
            if (this.newTodo.text.trim()) {
                this.todos.push({
                    id: Date.now(),
                    ...this.newTodo,
                    completed: false,
                    imageUrl: ''
                });
                this.saveTodos();
                this.newTodo.text = '';
                this.newTodo.description = '';
            }
        },
        removeTodo(id) {
            this.todos = this.todos.filter(todo => todo.id !== id);
            this.saveTodos();
        },
        toggleComplete(id) {
            this.todos = this.todos.map(todo => 
                todo.id === id ? {...todo, completed: !todo.completed} : todo
            );
            this.saveTodos();
        },
        async fetchRandomImage(id) {
            try {
                const response = await fetch('https://picsum.photos/200/300');
                this.todos = this.todos.map(todo => 
                    todo.id === id ? {...todo, imageUrl: response.url} : todo
                );
                this.saveTodos();
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        },
        async fetchPosts() {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=100');
            this.posts = await response.json();
        },
        saveTodos() {
            localStorage.setItem('vue-todos', JSON.stringify(this.todos));
        }
    },
    template: `
        <div>
            <h2>Vue App</h2>
            <div>
                <input
                    type="text"
                    v-model="newTodo.text"
                    @keyup.enter="addTodo"
                    placeholder="Заголовок"
                >
                <input
                    type="text"
                    v-model="newTodo.description"
                    placeholder="Описание"
                >
                <input
                    type="date"
                    v-model="newTodo.date"
                >
                <button @click="addTodo">Добавить</button>
            </div>
            
            <ul>
                <li 
                    v-for="todo in todos" 
                    :key="todo.id"
                    :class="{ completed: todo.completed }"
                >
                    <div>
                        <strong>{{ todo.text }}</strong>
                        <p>{{ todo.description }}</p>
                        <small>{{ todo.date }}</small>
                        <img 
                            v-if="todo.imageUrl" 
                            :src="todo.imageUrl" 
                            class="todo-image"
                        >
                    </div>
                    <div class="todo-actions">
                        <button @click="toggleComplete(todo.id)">
                            {{ todo.completed ? 'Восстановить' : 'Завершить' }}
                        </button>
                        <button @click="fetchRandomImage(todo.id)">Изображение</button>
                        <button @click="removeTodo(todo.id)">Удалить</button>
                    </div>
                </li>
            </ul>
            
            <h3>Latest Posts (100)</h3>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Body</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="post in posts" :key="post.id">
                        <td>{{ post.id }}</td>
                        <td>{{ post.title }}</td>
                        <td>{{ post.body }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
    mounted() {
        this.fetchPosts();
    }
});

// Монтируем приложение только когда контейнер существует
document.addEventListener('DOMContentLoaded', () => {
    const vueAppContainer = document.getElementById('vue-app');
    if (vueAppContainer) {
        vueApp.mount('#vue-app');
    }
});