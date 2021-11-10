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
                :key="origin"
                :keywordList="keywordsList"
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
    async asyncData({ store, params, redirect }) {
        const [response, error] = await store.dispatch('explorer/getStoreReport', params.id);

        if(error) {
            return redirect('/finder/explorer');
        }
    },
    mounted() {
        this.keywordsList;
    },
    computed: {
        report() {
            return this.$store.state.explorer.report;
        },
        keywordsList() {
            return Object.entries(this.$store.state.explorer.report.phrases).map(x => ({
                percent: x[1].count,
                word: x[0]
            }));

            // return this.$store.state.explorer.report.phrases.entries().map(x => ({ percent: x[1].count, word: x[0] }));
            return 1;
        }
    }
}
</script>
<style lang="scss" scoped>

</style>