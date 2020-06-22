<template>
    <div class="col-md-12">
        <div class="card card-container">
            <form name="form" @submit.prevent="handleCreate">
                <div class="form-group">
                    <label for="title">Title</label>
                    <input
                        v-model="fixture.title"
                        id="title"
                        v-validate="'required|min:3|max:191'"
                        type="text"
                        class="form-control"
                        name="title" />
                    <div
                        v-if="submitted && errors.has('title')"
                        class="alert-danger"
                    >{{errors.first('title')}}</div>
                </div>
                <div class="form-group">
                    <label for="match_date">Match Date</label>
                    <input
                        v-model="fixture.match_date"
                        required
                        id="match_date"
                        type="datetime-local"
                        class="form-control"
                        name="match_date" />
                </div>
                <div class="form-group">
                    <label for="team1">Team 1</label>
                    <select
                        v-model="fixture.team1_id"
                        id="team1" name="team1" class="form-control" @change="changeTeam1($event)"
                        v-validate="'required'">
                        <option value="" selected disabled>Choose a team</option>
                        <option v-for="team in teams" :value="team.id" :key="team.id">
                            {{ team.name }}
                        </option>
                    </select>
                    <div
                        v-if="submitted && errors.has('team1')"
                        class="alert-danger"
                    >{{errors.first('team1')}}</div>
                </div>
                <div class="form-group">
                    <label for="team2">Team 2</label>
                    <select
                            v-model="fixture.team2_id"
                            id="team2" name="team2" class="form-control" @change="changeTeam2($event)"
                            v-validate="'required'">
                        <option value="" selected disabled>Choose a team</option>
                        <option v-for="team in teams" :value="team.id" :key="team.id">
                            {{ team.name }}
                        </option>
                    </select>
                    <div
                        v-if="submitted && errors.has('team2')"
                        class="alert-danger"
                    >{{errors.first('team2')}}</div>
                </div>

                <div class="form-group">
                    <button class="btn btn-primary btn-block">Create Fixture</button>
                </div>
            </form>
            <div
                v-if="message"
                class="alert"
                :class="successful ? 'alert-success' : 'alert-danger'"
            >{{message}}</div>
        </div>
    </div>
</template>

<script>
    import Fixture from '@/models/fixture';
    import FixtureService from "@/services/fixture.service";
    import TeamService from '@/services/team.service';
    import moment from 'moment'

    export default {
        data() {
            return {
                fixture: new Fixture('', '', '', ''),
                submitted: false,
                successful: false,
                message: '',
                teams: [],
                selectedTeam1: null,
                selectedTeam2: null
            };
        },
        computed: {
            loggedIn() {
                return this.$store.state.auth.status.loggedIn;
            }
        },
        mounted() {
            if (!this.loggedIn) {
                this.$router.push('/');
            }
            this.getTeams();
        },
        methods: {
            async handleCreate() {
                console.log(this.fixture);
                this.message = '';
                this.submitted = true;

                const isValid = await this.$validator.validateAll();

                if (!isValid) {
                    this.successful = false;
                    return;
                }

                this.fixture.match_date = moment(this.fixture.match_date).format('YYYY-MM-DD hh:mm:00');

                try {
                    const token = this.$store.state.auth.user.access_token ?? null;
                    const response = await FixtureService.createFixture(this.fixture, token);
                    this.successful = true;
                    this.message = response.message;
                }
                catch(err) {
                    this.successful = false;
                    if(err.response) {
                        this.message = err.response.data.errors;
                        return;
                    }
                    this.message = err.message;
                }
            },
            changeTeam1(event) {
                this.selectedTeam1 = event.target.value
            },
            changeTeam2(event) {
                this.selectedTeam2 = event.target.value
            },
            async getTeams() {
                const response = await TeamService.getAllTeams(1, 'false');
                this.teams = response.data;
            }
        }
    };
</script>