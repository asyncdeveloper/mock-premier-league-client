<template>
    <div class="col-md-12">
        <div class="card card-container">
            <form name="form" @submit.prevent="handleUpdate">
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
                        v-model="fixture.team1.id"
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
                        v-model="fixture.team2.id"
                        id="team2" name="team2"
                        class="form-control"
                        @change="changeTeam2($event)"
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
                    <button class="btn btn-primary btn-block">Update Fixture</button>
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
                fixtureId: null,
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
            this.fixtureId = this.$route.params.id;
            this.getTeams();
            this.getFixture();
        },
        methods: {
            async handleUpdate() {
                this.message = '';
                this.submitted = true;

                const isValid = await this.$validator.validateAll();

                if (!isValid) {
                    this.successful = false;
                    return;
                }

                const myFixture = {
                    title: this.fixture.title,
                    match_date: moment(this.fixture.match_date).format('YYYY-MM-DD hh:mm:00'),
                    team1_id: this.fixture.team1.id,
                    team2_id: this.fixture.team2.id,
                };

                try {
                    const token = this.$store.state.auth.user.access_token ?? null;
                    const response = await FixtureService.updateFixture(this.fixture.id, myFixture, token);
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
            },
            async getFixture() {
                const token = this.$store.state.auth.user.access_token ?? null;
                const response = await FixtureService.getFixture(this.fixtureId, token);
                this.fixture = response.data;
            }
        }
    };
</script>