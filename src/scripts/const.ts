const GAME = {
    DEFAULT_STATE: 'Boot',
    DOM_ELEMENT: 'bunnywars-main',
    SCREEN: {
        BASE_WIDTH: window.innerWidth < 500 ? window.innerWidth : 375,
        BASE_HEIGHT:  window.innerHeight < 723 ? window.innerHeight : 723,
        OFFSETX: window.innerWidth < 500 ? ((window.innerWidth - 375) / 2) : 0,
        OFFSETY: (window.innerHeight < 723 ? window.innerHeight : 723) - 667
    },
    INITIAL_LIFES: 3,
    NUMBER_OF_ASTEROIDS: 10,
    INCREASE_SPEED_TIME: 5000,
    MAX_ASTEROIDS: 100,
    CREATE_ASTEROID_TIME: 10000
};

const baseAPI = 'http://104.131.195.202:8080';

const API = {
    login: `${baseAPI}/login`,
    url: `${baseAPI}`,
    leaderboard: `${baseAPI}/leaderboard`
};

export { GAME, API };
