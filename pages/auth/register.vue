<template>
    <form @submit.prevent="login" class="auth-form" method="POST">
        <div class="auth-input">
            <input type="email" name="email" v-model="email" placeholder="Email">
        </div>
        
        <div class="auth-input">
            <input type="password" name="password" v-model="password" placeholder="Password">
        </div>

        <div class="auth-input">
            <label>
                <input type="checkbox" v-model="remember">
                Stay Logged In
            </label>
        </div>

        <Button type="submit" fluid buttonClasses="auth-btn">Register</Button>
    </form>
</template>
<script>
import Button from '@/components/Shared/FormElements/Button';

export default {
    components: { Button },
    data() {
        return {
            email: '',
            password: '',
            remember: false
        }
    },
    methods: {
        async login() {

        }
    }
}
</script>Input