<template>
  <div class="container">
    <h3 class="section-title mb-2 mb-lg-4 text-center">Analyzer History</h3>
    <Table />
  </div>
</template>
<script>
import Table from '@/components/ProductAnalyzer/History/Table';

export default {
  components: { Table },
    async asyncData({ store, params }) {
        await store.dispatch('analyzer/getHistoryItems', params.page || 1);
    }
};
</script>