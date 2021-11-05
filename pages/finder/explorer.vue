<template>
    <div class="container">
      <div class="page-logo">
          <img src="/images/keyword-finder.png" alt="keyword-finder" />
      </div>
      <h3 class="section-title">Keyword Explorer</h3>

      <Input placeholder="Filter" :value="search" @input="search = $event.target.value" />

      <div class="keyword-reports">
        <ExplorerListItem
            v-for="(store, index) in stores"
            :key="store.id"
            :store="store"
            :index="index"
        />  
      </div>
    </div>
</template>
<script>
import ExplorerListItem from '@/components/KeywordExplorer/ExplorerListItem';

import Input from '@/components/Shared/FormElements/Input';

export default {
    components: {
        ExplorerListItem,
        Input
    },
    async asyncData({ store }) { 
        await store.dispatch('explorer/getStores');
    },
    data() {
        return {
            search: ''
        }
    },
    computed: {
        stores() {
            return this.$store.state.explorer.stores.filter(x => x.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1);
        }
    }
}
</script>
<style scoped>
.keyword-reports {
    margin-top: 2rem;
}
</style>