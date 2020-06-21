<template>
    <div class="col-md-12">
        <div class="card card-container">
            <img
                id="profile-img"
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                class="profile-img-card" />
            <form name="form" @submit.prevent="handleRegister">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input
                        v-model="user.name"
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
                    <label for="email">Email</label>
                    <input
                        v-model="user.email"
                        id="email"
                        v-validate="'required|email|max:191'"
                        type="email"
                        class="form-control"
                        name="name" />
                    <div
                        v-if="submitted && errors.has('email')"
                        class="alert-danger"
                    >{{errors.first('email')}}</div>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input
                        v-model="user.password"
                        v-validate="'required|min:5|max:191'"
                        type="password"
                        class="form-control"
                        name="password"
                        id="password" />
                    <div
                        v-if="submitted && errors.has('password')"
                        class="alert-danger"
                    >{{errors.first('password')}}</div>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary btn-block">Register</button>
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
    import User from '../models/user';

    export default {
        name: 'Register',
        data() {
            return {
                user: new User('', '', ''),
                submitted: false,
                successful: false,
                message: ''
            };
        },
        computed: {
            loggedIn() {
                return this.$store.state.auth.status.loggedIn;
            }
        },
        mounted() {
            if (this.loggedIn) {
                this.$router.push('/profile');
            }
        },
        methods: {
            async handleRegister() {
                this.message = '';
                this.submitted = true;

                const isValid = await this.$validator.validateAll();

                if (!isValid) {
                    this.successful = false;
                    this.message = "Validation failed";
                    return;
                }
                try {
                    const data = await this.$store.dispatch('auth/register', this.user);
                    this.message = data.message;
                    this.successful = true;
                } catch (error) {
                    this.message = error.response.data.errors;
                    this.successful = false;
                }
            }
        }
    };
</script>