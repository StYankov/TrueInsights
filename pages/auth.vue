<template>
    <div class="auth-content">        
        <h3 class="auth-content__heading">True Insights</h3>
        <div class="auth-box">
            <div class="auth-tabs">
                <button @click="$router.push('/auth/login')" class="auth-tab" :class="{active: currentRoute === 'login'}">
                    Login
                </button> 
                <button @click="disabledRegisters" class="auth-tab" :class="{active: currentRoute === 'register'}">
                    Sign up
                </button>
            </div>

            <keep-alive>
                <NuxtChild />
            </keep-alive>
        </div>
        <div class="auth-under-line"></div>
        <div class="auth-under-line auth-under-line--small"></div>
    </div>
</template>
<script>
export default {
    auth: 'guest',
    layout: 'auth',
    async asyncData({ route, redirect }) {
        if(route.name === 'auth')
            return redirect('/auth/login');
    },
    methods: {
        disabledRegisters() {
            // previous value
            // $router.push('/auth/register')

            this.$swal.fire(
                'Warning',
                'The registrations have been temporarily disabled',
                'warning'
            );
        }
    },
    computed: {
        currentRoute() {
            return this.$route.name.replace('auth-', '');
        }
    }
}
</script>