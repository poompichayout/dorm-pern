export default () => {
    var BASE_URL = '';
    if(process.env.NODE_ENV === 'development')
        BASE_URL = 'http://localhost:8080';
    return BASE_URL;
}