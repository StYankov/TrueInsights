<template>
    <iframe :src="storeUrl"></iframe>
</template>
<script>
export default {
    async asyncData({ store, params, redirect }) {
        const [response, error] = await store.dispatch('analytics/fetchAnalyticsUrl', params.store_id);

        if(error) {
            return redirect('/analytics');
        }
    },
    computed: {
        storeUrl() {
            return this.$store.state.analytics.urls[this.$route.params.store_id];
        }
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