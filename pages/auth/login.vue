<template>
    <form @submit.prevent="login" class="auth-form" method="POST">
        <div class="auth-input">
            <input type="email" name="email" v-model="user.email" placeholder="Email">
        </div>
        
        <div class="auth-input">
            <input type="password" name="password" v-model="user.password" placeholder="Password">
        </div>

        <div class="auth-input">
            <label>
                <input type="checkbox" v-model="user.remember">
                Stay Logged In
            </label>
        </div>

        <Button type="submit" fluid buttonClasses="auth-btn">Login</Button>
    </form>
</template>
<script>
import Button from '@/components/Shared/FormElements/Button';

export default {
    components: { Button },
    data() {
        return {
            user: {
                email: '',
                password: '',
                remember: false
            }
        }
    },
    methods: {
        async login() {
            const [user, errors] = await this.$store.dispatch('profile/login', this.user);

            if(error) {
                alert(errors[0]);
            }
        }
    }
}
</script>Input