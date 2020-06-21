<template>
    <div class="col-md-12">
        <div class="card card-container">
            <img
                id="profile-img"
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                class="profile-img-card" />
            <form name="form" @submit.prevent="handleLogin">
                <div class="form-group">
                    <label for="email">Username</label>
                    <input
                        v-model="user.email"
                        id="email"
                        v-validate="'required'"
                        type="email"
                        class="form-control"
                        name="email" />
                    <div
                        v-if="errors.has('email')"
                        class="alert alert-danger"
                        role="alert"
                    >Email is required!</div>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input
                        v-model="user.password"
                        v-validate="'required'"
                        type="password"
                        class="form-control"
                        name="password"
                        id="password" />
                    <div
                        v-if="errors.has('password')"
                        class="alert alert-danger"
                        role="alert"
                    >Password is required!</div>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary btn-block" :disabled="loading">
                        <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                        <span>Login</span>
                    </button>
                </div>
                <div class="form-group">
                    <div v-if="message" class="alert alert-danger" role="alert">
                        {{message}}
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import User from '../models/user';

    export default {
        name: 'Login',
        data() {
            return {
                user: new User('', ''),
                loading: false,
                message: ''
            };
        },
        computed: {
            loggedIn() {
                return this.$store.state.auth.status.loggedIn;
            }
        },
        created() {
            if (this.loggedIn) {
                this.$router.push('/profile');
            }
        },
        methods: {
            async handleLogin() {
                this.loading = true;
                const isValid = await this.$validator.validateAll();

                if (!isValid) {
                    this.loading = false;
                    return;
                }

                if (this.user.email && this.user.password) {
                    try {
                        await this.$store.dispatch('auth/login', this.user);
                        await this.$router.push('/')
                    } catch (error) {
                        this.loading = false;
                        this.message = error.response.data.errors;
                    }
                }
            }
        }
    };
</script>