<template>
    <div class="container">
      <div class="page-head">
        <h3 class="section-title">Share of search</h3>
      </div>
    
      <div class="keyword-reports">
        <ListItem
            v-for="(store, index) in items"
            :key="store.id"
            :store="store"
            :index="index"
        />
      </div>
    </div>
</template>
<script>
import ListItem from '@/components/Analytics/StoreItem';

export default {
    components: { ListItem },
    async asyncData({ store }) {
        await store.dispatch('zoho/getViews', 'Share of Search');
    },
    computed: {
      items() {
        return this.$store.state.zoho.data['Share of Search'];
      }
    }
}
</script>