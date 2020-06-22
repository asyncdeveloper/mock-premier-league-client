import axios from 'axios';
// import authHeader from './auth.header';

const API_URL = 'http://localhost:8000/api';

class TeamService {
    async getAllTeams(pageNo) {
        const response = await axios.get(API_URL + '/teams?page='+pageNo);
        return response.data;
    }

    async deleteTeam(id, token) {
        return await axios.delete(API_URL + '/teams/' + id, {headers: { Authorization: 'Bearer ' + token}});
    }

}

export default new TeamService();