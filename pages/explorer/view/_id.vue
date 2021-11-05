<template>
    <div class="explorer-report-view">
        <h3 class="section-title">{{ report.store.name }}</h3>

        <div class="explores">
            <!-- <ChartTableView
                v-for="(keyword_list, origin) in report.keywords_list"
                :key="origin"
                :origin="origin"
                :keywords_list="keyword_list"
            /> -->
            <!-- <div class="explore-branch">
            </div>
             -->
            <Chart
                v-for="(keyword_list, origin) in report.keywords_list"
                :key="origin"
                :keyword="origin"
                :keywordList="keyword_list"
            />
        </div>

        <div class="text-center">
            <Button @click="$router.back()" center>Back</Button>
        </div>
    </div>
</template>
<script>
import Chart from '@/components/KeywordFinder/KeywordChart';
import ChartTableView from '@/components/KeywordExplorer/ChartTableView';
import Button from '@/components/Shared/FormElements/Button';

export default {
    components: {
        Chart,
        ChartTableView,
        Button
    },
    async asyncData({ store, params }) {
        const [response, error] = await store.dispatch('explorer/getStoreReport', params.id);
    },
    computed: {
        report() {
            return this.$store.state.explorer.report;
        }
    }
}
</script>
<style lang="scss" scoped>

</style>