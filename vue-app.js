const { createApp } = Vue;

createApp({
    data() {
        return {
            todos: JSON.parse(localStorage.getItem('vue-todos')) || [],
            newTodo: '',
            clickCount: parseInt(localStorage.getItem('vue-clicks')) || 0,
            posts: []
        }
    },
    methods: {
        addTodo() {
            if (this.newTodo.trim()) {
                this.todos.push(this.newTodo);
                this.saveTodos();
                this.newTodo = '';
            }
        },
        saveTodos() {
            localStorage.setItem('vue-todos', JSON.stringify(this.todos));
        },
        incrementClick() {
            this.clickCount++;
            localStorage.setItem('vue-clicks', this.clickCount);
        },
        async fetchPosts() {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            this.posts = await response.json();
        }
    },
    mounted() {
        this.fetchPosts();
    },
    template: `
        <div>
            <h2>Vue App</h2>
            <div>
                <input type="text" v-model="newTodo" @keyup.enter="addTodo" placeholder="New todo">
                <button @click="addTodo">Add Todo</button>
            </div>
            <ul>
                <li v-for="(todo, index) in todos" :key="index">{{ todo }}</li>
            </ul>
            
            <div class="clicker">
                <button @click="incrementClick">Click me! {{ clickCount }}</button>
            </div>
            
            <h3>Latest Posts</h3>
            <table>
                <tr v-for="post in posts.slice(0,5)" :key="post.id">
                    <td>{{ post.title }}</td>
                </tr>
            </table>
        </div>
    `
}).mount('#vue-app');