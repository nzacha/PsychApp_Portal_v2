interface Environment {
    API_BASE_URL: string;
    CHAT_BASE_URL: string;
    APP_NAME: string;
    STATIC_FILES_URL: string;
}

const Prodution: Environment = {
    API_BASE_URL: 'http://45.134.226.253:5050',
    CHAT_BASE_URL: 'http://45.134.226.253:5051',
    APP_NAME: 'PsychApp',
    STATIC_FILES_URL: 'http://45.134.226.253:/static',
};

const Development: Environment = {
    API_BASE_URL: 'http://45.134.226.253:5050',
    CHAT_BASE_URL: 'http://45.134.226.253:5051',
    APP_NAME: 'PsychApp',
    STATIC_FILES_URL: 'http://45.134.226.253:/static',
    // API_BASE_URL: 'http://localhost:5050',
    // CHAT_BASE_URL: 'http://localhost:5051',
    // APP_NAME: 'PsychApp Development',
    // STATIC_FILES_URL: 'http://localhost:5050/static',
};

export default process.env.NODE_ENV === 'production' ? Prodution : Development;
  