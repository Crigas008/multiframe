function ReactApp() {
    const [todos, setTodos] = React.useState(
        JSON.parse(localStorage.getItem('react-todos')) || []
    );
    const [newTodo, setNewTodo] = React.useState({
        text: '',
        description: '',
        date: new Date().toISOString().slice(0, 10)
    });
    const [posts, setPosts] = React.useState([]);

    React.useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts?_limit=100')
            .then(res => res.json())
            .then(data => setPosts(data));
    }, []);

    const addTodo = () => {
        if (newTodo.text.trim()) {
            const updatedTodos = [...todos, {
                id: Date.now(),
                ...newTodo,
                completed: false,
                imageUrl: ''
            }];
            setTodos(updatedTodos);
            localStorage.setItem('react-todos', JSON.stringify(updatedTodos));
            setNewTodo({...newTodo, text: '', description: ''});
        }
    };

    const removeTodo = (id) => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
        localStorage.setItem('react-todos', JSON.stringify(updatedTodos));
    };

    const toggleComplete = (id) => {
        const updatedTodos = todos.map(todo => 
            todo.id === id ? {...todo, completed: !todo.completed} : todo
        );
        setTodos(updatedTodos);
        localStorage.setItem('react-todos', JSON.stringify(updatedTodos));
    };

    const fetchRandomImage = async (id) => {
        try {
            const response = await fetch('https://picsum.photos/200/300');
            const updatedTodos = todos.map(todo => 
                todo.id === id ? {...todo, imageUrl: response.url} : todo
            );
            setTodos(updatedTodos);
            localStorage.setItem('react-todos', JSON.stringify(updatedTodos));
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    };

    return (
        <div>
            <h2>React App</h2>
            <div>
                <input
                    type="text"
                    value={newTodo.text}
                    onChange={(e) => setNewTodo({...newTodo, text: e.target.value})}
                    placeholder="Заголовок"
                />
                <input
                    type="text"
                    value={newTodo.description}
                    onChange={(e) => setNewTodo({...newTodo, description: e.target.value})}
                    placeholder="Описание"
                />
                <input
                    type="date"
                    value={newTodo.date}
                    onChange={(e) => setNewTodo({...newTodo, date: e.target.value})}
                />
                <button onClick={addTodo}>Добавить</button>
            </div>

            <ul>
                {todos.map(todo => (
                    <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                        <div>
                            <strong>{todo.text}</strong>
                            <p>{todo.description}</p>
                            <small>{todo.date}</small>
                            {todo.imageUrl && <img src={todo.imageUrl} alt="Random" className="todo-image"/>}
                        </div>
                        <div className="todo-actions">
                            <button onClick={() => toggleComplete(todo.id)}>
                                {todo.completed ? 'Восстановить' : 'Завершить'}
                            </button>
                            <button onClick={() => fetchRandomImage(todo.id)}>Изображение</button>
                            <button onClick={() => removeTodo(todo.id)}>Удалить</button>
                        </div>
                    </li>
                ))}
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
                    {posts.map(post => (
                        <tr key={`post-${post.id}`}>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>{post.body}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

ReactDOM.render(<ReactApp />, document.getElementById('react-app'));