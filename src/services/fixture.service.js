import axios from 'axios';

//TODO:: change to env and use bearer token on protected routes
const API_URL = 'http://localhost:8000/api';

class FixtureService {
    async getAllFixtures(pageNo) {
        const response = await axios.get(API_URL + '/fixtures?page='+pageNo);
        return response.data;
    }

    async deleteFixture(id, token) {
        return await axios.delete(API_URL + '/fixtures/' + id, {headers: { Authorization: 'Bearer ' + token}});
    }

}

export default new FixtureService();