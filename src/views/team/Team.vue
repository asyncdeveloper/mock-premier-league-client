<template id="user-table">
    <div class="mt-5 mb-5">
        <div>
            <router-link v-if="loggedIn" to="/teams/create">
                <b-button pill variant="primary" >Create a Team</b-button>
            </router-link>

        </div>
        <div class="form-group">
            <div v-if="error" class="alert alert-danger" role="alert">
                {{error}}
            </div>
            <div v-if="message" class="alert alert-success" role="alert">
                {{message}}
            </div>
        </div>
        <table>
            <thead>
            <tr>
                <th v-for="col in userCols" :key="col">{{ col }}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="team in teams" :key="team.id">
                <td>{{ team.id }}</td>
                <td>{{ team.name }}</td>
                <td>{{ team.year_founded }}</td>
                <td>
                    <router-link class="mr-2" v-if="loggedIn" :to="'/teams/' + team.id">
                        <b-button pill size="sm" variant="info">View</b-button>
                    </router-link>
                    <router-link class="mr-2" v-if="loggedIn" :to="'/teams/edit/' + team.id">
                        <b-button pill size="sm" variant="primary">Edit</b-button>
                    </router-link>
                    <b-button
                        v-if="loggedIn"
                        v-on:click="deleteTeam(team.id)"
                        pill  size="sm"
                        variant="danger">
                        Delete
                    </b-button>
                </td>
            </tr>
            </tbody>
        </table>

        <p>
            Viewing {{ this.start }} - {{ this.end }} of {{ totalData }} results
        </p>
        <pagination
            @change="changePage"
            :current-page="page"
            :max-pages="totalPages">
        </pagination>

    </div>
</template>

<script>
    import Pagination from "@/views/Pagination";
    import TeamService from '@/services/team.service';

    export default {
        components: { 'pagination': Pagination },
        computed: {
            loggedIn() {
                return this.$store.state.auth.status.loggedIn;
            }
        },
        data() {
            //TODO:: use env for base URL
            return {
                baseUrl: 'http://localhost:8000/api/teams',
                page: 1,
                currentPage: 1,
                start: 0,
                end: 0,
                totalPages: 0,
                totalData: 0,
                teams: [],
                userCols: ['id', 'name', 'year_founded', 'actions'],
                error: null,
                message: null,
            };
        },
        methods: {
            async deleteTeam(id) {
                try {
                    const token = this.$store.state.auth.user.access_token ?? null;
                    const response = await TeamService.deleteTeam(id, token);

                    if(response.status === 204) {
                        this.message = 'Deleted Successfully';
                        this.teams = this.teams.filter( team => team.id !== id );
                    }
                }catch (err) {
                    if(!err.response) {
                        this.error = err.message;
                        return;
                    }

                    if(err.response.status === 401) {
                        this.error = 'You are not allowed to perform action';
                        return ;
                    }
                    this.error = err.response.data.errors;
                }
            },
            async getData() {
                try {
                    const response = await TeamService.getAllTeams(this.page);
                    this.totalPages = response.meta.last_page;
                    this.totalData = response.meta.total;
                    this.currentPage = response.meta.current_page;
                    this.teams = response.data;
                    this.start = response.meta.from;
                    this.end = response.meta.to;
                }
                catch(err) {
                    if(err.response) {
                        this.error = err.response.data.errors;
                        return;
                    }
                    this.error = err.message;
                }
            },
            changePage(page) {
                this.page = page;
            },
        },
        watch: {
            page: {
                immediate: true,
                handler() {
                    this.getData();
                },
            },
        },
    }

</script>
