<template>
  <div class="explorer-report-view">
    <div class="container">
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
            <Chart origin="" :keywordList="keywordsList" />
        </div>

        <h3 class="section-title mt-5">Search Brand</h3>
        <div class="brand-search">
            <Input placeholder="Brand..." :value="brand" @input="brand = $event.target.value" />

            <Button small @click="searchBrand">Search</Button>
        </div>

        <Loader center v-if="brandSearchLoading" />

        <ComparisonTable 
            v-if="brandsData.length"
            title="Keyword Origins" 
            :labels="['','','']"
            :rows="brandsData"
        />

        <p v-if="brandSearchMessage">{{ brandSearchMessage }}</p>

        <div class="text-center">
            <Button @click="$router.back()" center>Back</Button>
        </div>
    </div>
  </div>
</template>
<script>
import Chart from "@/components/KeywordFinder/KeywordChart";
import ChartTableView from "@/components/KeywordExplorer/ChartTableView";
import Button from "@/components/Shared/FormElements/Button";
import Input from "@/components/Shared/FormElements/Input";
import Loader from "@/components/Shared/FormElements/Loader";
import ComparisonTable from '@/components/Tables/ComparisonTable';

export default {
  components: {
    Chart,
    ChartTableView,
    Button,
    Input,
    Loader,
    ComparisonTable
  },
  async asyncData({ store, params, redirect, route }) {
    const [response, error] = await store.dispatch(
      "explorer/getStoreReport",
      params.id
    );

    if (error) {
      return redirect("/finder/explorer");
    }

    return {
      totalResults: Math.min(route.query.results || 30, 150),
    };
  },
  data() {
    return {
      totalResults: 30,
      brandSearchMessage: '',
      brand: '',
      brandSearchLoading: false,
      brandsData: []
    };
  },
  methods: {
    async searchBrand() {
        if(this.brand.length < 2)
            return;
        
        this.brandSearchLoading = true;
        this.brandSearchMessage = '';

        try {
            const response = await this.$axios.post(`/keyword-explorer/${this.report.store.id}/tree-search/`, { brand: this.brand });

            this.brandsData = response.data.data;
            this.brandSearchMessage = 'No results for your query';
        } catch(e) {
            this.$swal.fire(
                'Unexpected Error',
                'An error occured while we were searching for your brand keywords. Please try again',
                'warning'
            );
        }

        this.brandSearchLoading = false;
    }
  },
  computed: {
    report() {
      return this.$store.state.explorer.report;
    },
    keywordsList() {
      return Object.entries(this.$store.state.explorer.report.phrases)
        .map((x) => ({
          percent: x[1].count,
          word: x[0],
        }))
        .slice(0, parseInt(this.totalResults));
    },
  },
};
</script>
<style lang="scss" scoped>
.brand-search {
    display: flex;
    align-items: center;

    button {
        margin-left: 2rem;
    }
}
</style>