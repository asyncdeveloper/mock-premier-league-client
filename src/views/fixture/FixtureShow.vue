<template>
    <div>
        <b-card title="Fixture Information">
            <b-card-text>
                Title: {{ fixture.title }}
            </b-card-text>

            <b-card-text>
                Fixture Date: {{ moment(fixture.match_date).format("dddd, MMMM Do YYYY, h:mm:ss a") }}
            </b-card-text>

            <b-card-text>
                Team 1: {{ fixture.team1.name }}
            </b-card-text>

            <b-card-text>
                Team 2: {{ fixture.team2.name }}
            </b-card-text>
        </b-card>
    </div>
</template>

<script>
    import FixtureService from "@/services/fixture.service";

    export default {
        data() {
            return {
                fixture: [],
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

            this.getFixture();
        },
        methods: {
            async getFixture() {
                const token = this.$store.state.auth.user.access_token ?? null;
                const response = await FixtureService.getFixture(this.$route.params.id, token);
                this.fixture = response.data;
            }
        }
    };
</script>