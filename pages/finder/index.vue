<template>
    <div class="container">
      <div class="page-logo">
          <img src="/images/keyword-finder.png" alt="keyword-finder" />
      </div>
      <h3 class="section-title">Keyword Research</h3>

      <div class="keyword-reports">
        <ListItem
            v-for="(report, index) in reports"
            :key="report.id"
            :report="report"
            :index="index"
        />
      </div>

    </div>
</template>
<script>
import ListItem from '@/components/KeywordFinder/ListItem';

export default {
    components: {
        ListItem
    },
    async asyncData({ store }) { 
        await store.dispatch('finder/getReports');
    },
    data() {
        return {
            // reports: [
            //     {
            //         id: 1,
            //         name: 'Base Name 1',
            //         stores: ['a', 'b', 'c', 'd', 'e'],
            //         keywords: ['a', 'b', 'c', 'd'],
            //         status: 'processing'
            //     },
            //     {
            //         id: 2,
            //         name: 'Base Name Name',
            //         stores: ['a','e'],
            //         keywords: ['a', 'b', 'c', 'd'],
            //         status: 'processing'
            //     },
            //     {
            //         id: 3,
            //         name: 'Base Name 1',
            //         stores: ['a', 'b', 'c', 'd', 'e'],
            //         keywords: ['a', 'b', 'c', 'd'],
            //         status: 'processed'
            //     },
            //     {
            //         id: 4,
            //         name: 'Base Name 1',
            //         stores: ['a', 'b', 'c', 'd', 'e'],
            //         keywords: ['a', 'b', 'c', 'd'],
            //         status: 'processing'
            //     },
            //     {
            //         id: 5,
            //         name: 'Base Name 1',
            //         stores: ['a', 'b', 'c', 'd', 'e'],
            //         keywords: ['a', 'b', 'c', 'd'],
            //         status: 'queued'
            //     },
            //     {
            //         id: 6,
            //         name: 'Base Name 1',
            //         stores: ['a', 'b', 'c', 'd', 'e'],
            //         keywords: ['a', 'b', 'c', 'd'],
            //         status: 'processing'
            //     },
            //     {
            //         id: 7,
            //         name: 'Base Name 1',
            //         stores: ['a', 'b', 'c', 'd', 'e'],
            //         keywords: ['a', 'b', 'c', 'd'],
            //         status: 'processed'
            //     }
            // ]
        }
    },
    computed: {
        reports() {
            return this.$store.state.finder.reports;
        }
    }
}
</script>
<style lang="scss" src="@/assets/styles/pages/finder.scss"></style>