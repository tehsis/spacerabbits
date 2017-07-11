const GAME = {
    DEFAULT_STATE: 'Boot',
    DOM_ELEMENT: 'bunnywars-main',
    SCREEN: {
        BASE_WIDTH: 375,
        BASE_HEIGHT: 667
    },
    INITIAL_LIFES: 3,
    NUMBER_OF_ASTEROIDS: 10
};

const baseAPI = 'http://100.77.127.150:8080';

const API = {
    login: `${baseAPI}/login`,
    url: `${baseAPI}`,
    leaderboard: `${baseAPI}/leaderboard`
};

export {GAME, API};
