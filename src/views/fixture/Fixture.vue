<template id="user-table">
    <div class="mt-5 mb-5">
        <div>
            <router-link v-if="loggedIn" to="/fixtures/create">
                <b-button pill variant="primary" >Create a Fixture</b-button>
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
            <tr v-for="fixture in fixtures" :key="fixture.id">
                <td>{{ fixture.id }}</td>
                <td>{{ fixture.title }}</td>
                <td>{{ fixture.match_date }}</td>
                <td>{{ fixture.team1.name }}</td>
                <td>{{ fixture.team2.name }}</td>
                <td>
                    <b-button v-if="loggedIn" v-on:click="deleteFixture(fixture.id)" pill  size="sm" variant="danger">Delete </b-button>
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
    import FixtureService from '@/services/fixture.service';

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
                baseUrl: 'http://localhost:8000/api/fixtures',
                page: 1,
                currentPage: 1,
                start: 0,
                end: 0,
                totalPages: 0,
                totalData: 0,
                fixtures: [],
                userCols: ['id', 'title', 'match date', 'home_team', 'away_team', 'actions'],
                error: null,
                message: null
            };
        },
        methods: {
            async deleteFixture(id) {
                try {
                    const token = this.$store.state.auth.user.access_token ?? null;
                    const response = await FixtureService.deleteFixture(id, token);

                    if(response.status === 204) {
                        this.message = 'Deleted Successfully';
                        this.fixtures = this.fixtures.filter( fixture => fixture.id !== id );
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
                    const response = await FixtureService.getAllFixtures(this.page);
                    this.totalPages = response.meta.last_page;
                    this.totalData = response.meta.total;
                    this.currentPage = response.meta.current_page;
                    this.fixtures = response.data;
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
