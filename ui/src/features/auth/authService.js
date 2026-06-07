import BASE_URL from '../../api/axios';

const AuthService = {
    async register(name, email, password) {
        const response = await BASE_URL.post('/users', { name, email, password });
        return response.data;
    },

    async login(email, password) {
        const response = await BASE_URL.post('/users/login', { email, password });
        return response.data;
    }
};

export default AuthService;
