const FALLBACK_DATA = {
    performance: {
        react: { updateTime: '1.4 мс', memory: '3.2 МБ' },
        vue: { updateTime: '1.1 мс', memory: '2.8 МБ' },
        angular: { updateTime: '2.4 мс', memory: '4.1 МБ' }
    },
    usability: {
        react: {
            learningCurve: 'Средняя',
            projectSetup: 'Требует настройки'
        },
        vue: {
            learningCurve: 'Низкая',
            projectSetup: 'Простая'
        },
        angular: {
            learningCurve: 'Высокая',
            projectSetup: 'Полная'
        }
    },
    popularity: {
        react: {
            usage: 0.82,
            satisfaction: 0.89,
            githubStars: 217000,
            companies: ['Facebook', 'Airbnb', 'Netflix']
        },
        vue: {
            usage: 0.73,
            satisfaction: 0.91,
            githubStars: 206000,
            companies: ['Alibaba', 'Xiaomi', 'GitLab']
        },
        angular: {
            usage: 0.54,
            satisfaction: 0.65,
            githubStars: 92000,
            companies: ['Google', 'Microsoft', 'IBM']
        }
    },
    useCases: {
        react: {
            description: 'Динамичные интерфейсы, кроссплатформенные приложения (React Native)'
        },
        vue: {
            description: 'Быстрое прототипирование, SSR-приложения (Nuxt.js)'
        },
        angular: {
            description: 'Корпоративные системы, долгосрочные проекты'
        }
    }
};

const safeFetch = async (url, options = {}) => {
    try {
        const response = await fetch(url, options);
        if (!response.ok) return null;
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
};

export const fetchComparisonData = async () => {
    try {
        const [githubReact, githubVue, githubAngular] = await Promise.all([
            safeFetch('https://api.github.com/repos/facebook/react'),
            safeFetch('https://api.github.com/repos/vuejs/core'),
            safeFetch('https://api.github.com/repos/angular/angular')
        ]);

        return {
            ...FALLBACK_DATA,
            popularity: {
                react: {
                    ...FALLBACK_DATA.popularity.react,
                    githubStars: githubReact?.stargazers_count || FALLBACK_DATA.popularity.react.githubStars
                },
                vue: {
                    ...FALLBACK_DATA.popularity.vue,
                    githubStars: githubVue?.stargazers_count || FALLBACK_DATA.popularity.vue.githubStars
                },
                angular: {
                    ...FALLBACK_DATA.popularity.angular,
                    githubStars: githubAngular?.stargazers_count || FALLBACK_DATA.popularity.angular.githubStars
                }
            }
        };
    } catch (error) {
        console.error('Using fallback data:', error);
        return FALLBACK_DATA;
    }
};