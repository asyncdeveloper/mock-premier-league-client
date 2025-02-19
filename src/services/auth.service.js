import axios from 'axios';

const API_URL = `${process.env.VUE_APP_API_URL}/api/auth`;

class AuthService {
    async login({ email, password }) {
        const response =  await axios.post(`${API_URL}/login`, { email, password });
        if (response.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    }

    logout() {
        localStorage.removeItem('user');
    }

    register({ name, email, password}) {
        return axios.post(`${API_URL}/register`, {name, email, password });
    }
}

export default new AuthService();