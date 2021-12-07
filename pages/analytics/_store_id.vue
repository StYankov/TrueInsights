<template>
    <iframe :src="storeUrl"></iframe>
</template>
<script>
export default {
    data() {
        return {
            storeUrl: ''
        }
    },
    mounted() {
        const bearerToken = window.localStorage.getItem('auth._token.local') || '';
        const authToken = bearerToken.replace('Bearer ', '');

        this.storeUrl = `${process.env.baseURL}/api/v1/analytics/${this.$route.params.store_id}?auth=${authToken}`;
    }
}
</script>
<style scoped>
    iframe {
        width: 100%;
        height: 100vh;
        border: 0;
        box-shadow: none;
    }
</style>