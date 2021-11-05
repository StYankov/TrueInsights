<template>
    <div class="chart-table-view">
        <div class="tab-switch">
            <button @click="tab = 'chart'" class="tab">Chart</button>
            <button @click="tab = 'table'" class="tab">Table</button>
        </div>
        <div class="data-view">
            <Chart 
                v-if="tab == 'chart'"
                :keyword="origin"
                :keywordList="keywords_list"    
            />
            <Table
                v-else
            />
        </div>
    </div>
</template>
<script>
import Chart from '@/components/KeywordFinder/KeywordChart';
import Table from '@/components/KeywordExplorer/Table';

export default {
    components: {
        Chart,
        Table
    },
    props: {
        origin: {
            type: String,
            required: false,
            default: ''
        },
        keywords_list: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            tab: 'chart'
        }
    }
}
</script>
<style lang="scss" scoped>
.chart-table-view {
    margin-bottom: 2rem;
}
</style>