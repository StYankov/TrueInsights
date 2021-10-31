<template>
  <div class="container">
      <div class="page-logo">
          <img src="/images/keyword-finder.png" alt="keyword-finder" />
      </div>

      <h3 class="section-title">Report Name</h3>
      <Input containerClass="mb-4" :value="finder.name" disabled />

      <h3 class="section-title">Keywords</h3>
      <KeywordsBag />

      <h3 class="section-title mb-5">Results</h3>

      <template v-for="(store, storeName) in stores">
        <div class="store-section" :key="storeName">
            <h4 class="store-section-title">{{ storeName }}</h4>
            <KeywordChart v-for="(keywordReport, key) in store" :key="`${store}-${key}`" :keyword="key" :keywordList="keywordReport.list" />  
        </div>
      </template>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import RetailersSelect from '@/components/KeywordFinder/RetailersSelect';
import KeywordsBag from '@/components/KeywordFinder/KeywordsBag';
import KeywordChart from '@/components/KeywordFinder/KeywordChart';

import Button from '@/components/Shared/FormElements/Button';
import Input from '@/components/Shared/FormElements/Input';

export default {
    components: {
        RetailersSelect,
        Button,
        Input,
        KeywordsBag,
        KeywordChart
    },
    async asyncData({ store, params }) {
        await store.dispatch('finder/getCountries');
        await store.dispatch('finder/getStores');
        await store.dispatch('finder/getReport', params.id);
    },
    mounted() {
        console.log(this.finder);
    },
    methods: {
    },
    computed: {
        ...mapState('finder', ['finder']),
        stores() {
            return this.finder.results && this.finder.results.results; 
        }
    }
}
</script>
<style>
.heading-with-button {
    display: flex;
    align-items: center;
}
</style>