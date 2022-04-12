<template>
  <div class="container">
    <h3 class="section-title mb-2 mb-lg-4 text-center">Analyzer History</h3>
    <Table />
    <Pagination />
  </div>
</template>
<script>
import Table from '@/components/ProductAnalyzer/History/Table';
import Pagination from '@/components/ProductAnalyzer/History/Pagination';

export default {
  components: { Table, Pagination },
    async asyncData({ store, params }) {
        await store.dispatch('analyzer/getHistoryItems', params.page || 1);
    }
};
</script>