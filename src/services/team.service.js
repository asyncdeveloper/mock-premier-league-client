import axios from 'axios';
// import authHeader from './auth.header';

const API_URL = `${process.env.VUE_APP_API_URL}/api`;

class TeamService {
    async getAllTeams(pageNo = 1, paginate = 'true') {
        const response = await axios.get(`${API_URL}/teams?paginate=${paginate}&page=`+pageNo);
        return response.data;
    }

    async deleteTeam(id, token) {
        return await axios.delete(`${API_URL}/teams/${id}`, {headers: { Authorization: 'Bearer ' + token}});
    }

    async createTeam(team, token) {
        const response = await axios.post(`${API_URL}/teams`, team,
            { headers: { Authorization: 'Bearer ' + token }
        });
        return response.data;
    }

    async getTeam(id, token) {
        const response = await axios.get(`${API_URL}/teams/${id}`, {headers: { Authorization: 'Bearer ' + token}});
        return response.data;
    }

    async updateTeam(id, team, token) {
        console.log(token); 
        const response = await axios.patch(`${API_URL}/teams/${id}`, team,
            { headers: { Authorization: 'Bearer ' + token }
            });
        return response.data;
    }

}

export default new TeamService();