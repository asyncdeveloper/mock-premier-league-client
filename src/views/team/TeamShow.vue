<template>
    <div>
        <b-card title="Team Information">
            <b-card-text>
                Name: {{ team.name }}
            </b-card-text>

            <b-card-text>
                Year Founded: {{ team.year_founded }}
            </b-card-text>
        </b-card>
    </div>
</template>

<script>
    import TeamService from "@/services/team.service";

    export default {
        data() {
            return {
                team: [],
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

            this.getTeam();
        },
        methods: {
            async getTeam() {
                const token = this.$store.state.auth.user.access_token ?? null;
                const response = await TeamService.getTeam(this.$route.params.id, token);
                this.team = response.data;
            }
        }
    };
</script>