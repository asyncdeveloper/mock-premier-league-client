import axios from 'axios';

//TODO:: change to env and use bearer token on protected routes
const API_URL = `${process.env.VUE_APP_API_URL}/api/fixtures`;

class FixtureService {
    async getAllFixtures(pageNo) {
        const response = await axios.get(API_URL + '?page='+pageNo);
        return response.data;
    }

    async deleteFixture(id, token) {
        return await axios.delete(`${API_URL}/${id}`, {headers: { Authorization: 'Bearer ' + token}});
    }

    async createFixture(team, token) {
        const response = await axios.post(API_URL, team,
            { headers: { Authorization: 'Bearer ' + token }
            });
        return response.data;
    }

    async getFixture(id, token) {
        const response = await axios.get(`${API_URL}/${id}`, {headers: { Authorization: 'Bearer ' + token}});
        return response.data;
    }

    async updateFixture(id, fixture, token) {
        const response = await axios.patch(`${API_URL}/${id}`, fixture,
            { headers: { Authorization: 'Bearer ' + token }
            });
        return response.data;
    }
}

export default new FixtureService();