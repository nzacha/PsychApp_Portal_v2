interface Environment {
    API_BASE_URL: string;
    APP_NAME: string;
    STATIC_FILES_URL: string;
}

const Prodution: Environment = {
    API_BASE_URL: 'http://localhost:5000',
    APP_NAME: 'PsychApp',
    STATIC_FILES_URL: '/static',
};

const Development: Environment = {
    API_BASE_URL: 'http://localhost:5000',
    APP_NAME: 'PsycleachApp Development',
    STATIC_FILES_URL: 'http://localhost:5000/static',
};

export default process.env.NODE_ENV === 'production' ? Prodution : Development;
  