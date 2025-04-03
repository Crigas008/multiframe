import React, { useState, useEffect } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { fetchComparisonData } from './api';
import './App.css';

const App = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await fetchComparisonData();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    return (
        <ErrorBoundary>
            <div className="app">
                <header>
                    <h1>Сравнение React, Vue.js и Angular</h1>
                </header>

                {loading && <div className="status-box loading">Загрузка данных...</div>}
                {error && <div className="status-box error">Ошибка: {error}</div>}

                <nav className="navigation">
                    {['performance', 'usability', 'popularity', 'use-cases'].map((id) => (
                        <a key={id} href={`#${id}`} className="nav-link">
                            {{
                                'performance': '⚡ Производительность',
                                'usability': '🎯 Удобство',
                                'popularity': '📈 Популярность',
                                'use-cases': '💼 Применение'
                            }[id]}
                        </a>
                    ))}
                </nav>

                <main>
                    <Section
                        id="performance"
                        title="Производительность"
                        data={data?.performance}
                        render={(item) => (
                            <>
                                <DataRow label="Время обновления:" value={item.updateTime} />
                                <DataRow label="Потребление памяти:" value={item.memory} />
                            </>
                        )}
                    />

                    <Section
                        id="usability"
                        title="Удобство использования"
                        data={data?.usability}
                        render={(item) => (
                            <>
                                <DataRow label="Кривая обучения:" value={item.learningCurve} />
                                <DataRow label="Настройка проекта:" value={item.projectSetup} />
                            </>
                        )}
                    />

                    <Section
                        id="popularity"
                        title="Популярность и сообщество"
                        data={data?.popularity}
                        render={(item) => (
                            <>
                                <DataRow
                                    label="Использование:"
                                    value={item.usage ? `${(item.usage * 100).toFixed(1)}%` : 'N/A'}
                                />
                                <DataRow
                                    label="Удовлетворённость:"
                                    value={item.satisfaction ? `${(item.satisfaction * 100).toFixed(1)}%` : 'N/A'}
                                />
                                <DataRow
                                    label="GitHub Stars:"
                                    value={item.githubStars?.toLocaleString()}
                                    icon="⭐"
                                />
                                <DataRow
                                    label="Компании:"
                                    value={item.companies?.join(', ')}
                                />
                            </>
                        )}
                    />

                    <Section
                        id="use-cases"
                        title="Области применения"
                        data={data?.useCases}
                        render={(item) => <p className="use-case">{item.description}</p>}
                    />

                    <div className="hypothesis">
                        <h2>Гипотеза проекта</h2>
                        <p>Создание веб-сайта на фреймворке позволяет наглядно демонстрировать его отличия, что упрощает выбор технологии для начинающих разработчиков.</p>
                    </div>
                </main>
            </div>
        </ErrorBoundary>
    );
};

const Section = ({ id, title, data, render }) => {
    if (!data || Object.keys(data).length === 0) return null;

    return (
        <section id={id} className="section">
            <h2>{title}</h2>
            <div className="cards">
                {Object.entries(data).map(([framework, item]) => (
                    <div key={framework} className={`card ${framework}`}>
                        <h3>{framework.charAt(0).toUpperCase() + framework.slice(1)}</h3>
                        <div className="card-content">
                            {render(item)}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const DataRow = ({ label, value, icon }) => (
    <div className="data-row">
        <span className="label">{icon && <span className="icon">{icon}</span>}{label}</span>
        <span className="value">{value || 'N/A'}</span>
    </div>
);

export default App;