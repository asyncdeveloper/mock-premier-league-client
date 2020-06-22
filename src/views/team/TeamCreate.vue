<template>
    <div class="col-md-12">
        <div class="card card-container">
            <form name="form" @submit.prevent="handleCreate">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input
                        v-model="team.name"
                        id="name"
                        v-validate="'required|min:3|max:191'"
                        type="text"
                        class="form-control"
                        name="name" />
                    <div
                        v-if="submitted && errors.has('name')"
                        class="alert-danger"
                    >{{errors.first('name')}}</div>
                </div>
                <div class="form-group">
                    <label for="year_founded">Year</label>
                    <input
                        v-model="team.year_founded"
                        id="year_founded"
                        v-validate="`required|digits:4|min_value:1600|max_value:${currentYear}`"
                        type="text"
                        class="form-control"
                        name="year_founded" />
                    <div
                        v-if="submitted && errors.has('year_founded')"
                        class="alert-danger"
                    >{{errors.first('year_founded')}}</div>
                </div>

                <div class="form-group">
                    <button class="btn btn-primary btn-block">Create Team</button>
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
    import Team from '@/models/team';
    import TeamService from "@/services/team.service";

    export default {
        name: 'Register',
        data() {
            return {
                team: new Team('', ''),
                submitted: false,
                successful: false,
                message: '',
                currentYear: new Date().getFullYear()
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
        },
        methods: {
            async handleCreate() {
                this.message = '';
                this.submitted = true;

                const isValid = await this.$validator.validateAll();

                if (!isValid) {
                    this.successful = false;
                    this.message = "Validation failed";
                    return;
                }

                try {
                    const token = this.$store.state.auth.user.access_token ?? null;
                    const response = await TeamService.createTeam(this.team, token);
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
            }
        }
    };
</script>