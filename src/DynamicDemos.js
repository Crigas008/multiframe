import React, { useState } from 'react';

// Компонент с динамическим списком
export const DynamicListDemo = () => {
    const [items, setItems] = useState(['Элемент 1', 'Элемент 2', 'Элемент 3']);
    const [inputValue, setInputValue] = useState('');

    const handleAdd = () => {
        if (inputValue.trim()) {
            setItems([...items, inputValue]);
            setInputValue('');
        }
    };

    const handleRemove = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    return (
        <div className="demo-list">
            <div className="demo-controls">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Новый элемент"
                />
                <button onClick={handleAdd}>Добавить</button>
            </div>

            <div className="items-container">
                {items.map((item, index) => (
                    <div key={index} className="list-item">
                        <span>{item}</span>
                        <button onClick={() => handleRemove(index)}>×</button>
                    </div>
                ))}
            </div>
        </div>
    );
};


// Компонент с анимациями
export const AnimationDemo = () => {
    const [animated, setAnimated] = useState(false);

    return (
        <div className="animation-demo">
            <div className={`animated-box ${animated ? 'animate' : ''}`} />
            <button onClick={() => setAnimated(!animated)}>
                {animated ? 'Стоп' : 'Старт'}
            </button>
        </div>
    );
};

// Компонент с динамической формой
export const InteractiveFormDemo = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subscribe: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(JSON.stringify(formData, null, 2));
    };

    return (
        <form className="interactive-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Имя:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>
                    <input
                        type="checkbox"
                        name="subscribe"
                        checked={formData.subscribe}
                        onChange={handleChange}
                    />
                    Подписаться
                </label>
            </div>

            <button type="submit">Отправить</button>
        </form>
    );
};