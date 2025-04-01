function ReactApp() {
    const [todos, setTodos] = React.useState(
        JSON.parse(localStorage.getItem('react-todos')) || []
    );
    const [inputText, setInputText] = React.useState('');
    const [clickCount, setClickCount] = React.useState(
        parseInt(localStorage.getItem('react-clicks')) || 0
    );
    const [posts, setPosts] = React.useState([]);

    React.useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(data => setPosts(data));
    }, []);

    const addTodo = () => {
        if (inputText.trim()) {
            const newTodos = [...todos, inputText];
            setTodos(newTodos);
            localStorage.setItem('react-todos', JSON.stringify(newTodos));
            setInputText('');
        }
    };

    return (
        <div>
            <h2>React App</h2>
            <div>
                <input 
                    type="text" 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && addTodo()}
                    placeholder="New todo"
                />
                <button onClick={addTodo}>Add Todo</button>
            </div>
            <ul>
                {todos.map((todo, i) => <li key={i}>{todo}</li>)}
            </ul>
            
            <div className="clicker">
                <button onClick={() => {
                    const newCount = clickCount + 1;
                    setClickCount(newCount);
                    localStorage.setItem('react-clicks', newCount);
                }}>
                    Click me! {clickCount}
                </button>
            </div>
            
            <h3>Latest Posts</h3>
            <table>
                <tbody>
                    {posts.slice(0,5).map(post => (
                        <tr key={post.id}>
                            <td>{post.title}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

ReactDOM.render(<ReactApp />, document.getElementById('react-app'));