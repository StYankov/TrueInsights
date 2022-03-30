<template>
    <iframe :src="zohoUrl"></iframe>
</template>
<script>
export default {
    async asyncData({ store, params, redirect }) {
        const response = await store.dispatch('zoho/getView', params.store_id);

        if(!response) {
            return redirect('/');
        }
    },
    mounted() {
        console.log(this.view);
    },
    computed: {
        view() {
            return this.$store.state.zoho.view;
        },
        zohoUrl() {
            return  `https://analytics.zoho.eu/open-view/${this.view.zoho_id}`;
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