<template>
    <div class="container">
      <div class="page-head">
        <h3 class="section-title">Store Analytics</h3>
      </div>

      <div class="keyword-reports">
        <ListItem
            v-for="(store, index) in stores"
            :key="store.id"
            :store="store"
            :index="index"
        />
      </div>

    </div>
</template>
<script>
import ListItem from '@/components/Analytics/StoreItem';
import Button from '@/components/Shared/FormElements/Button';

export default {
    components: {
        ListItem,
        Button
    },
    async asyncData({ store }) { 
        await store.dispatch('analytics/fetchStores');
    },
    computed: {
        stores() {
            return this.$store.state.analytics.stores;
        }
    }
}
</script>
<style lang="scss" src="@/assets/styles/pages/finder.scss"></style>