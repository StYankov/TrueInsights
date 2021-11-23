<template>
  <div class="explorer-report-view">
    <div class="container">
        <h3 class="section-title">{{ report.store.name }}</h3>

        <div class="row filters">
          <div class="col-md-3">
            <Select
              :options="brands"
              name="brands-data"
              placeholder="Brands"
              value="all"
            />
          </div>
          <div class="col-md-3">
            <Select
              :options="brands"
              name="single-keyword"
              placeholder="Single Keywords"
              value="all"
            />
          </div>
          <div class="col-md-3">
            <Select
              :options="brands"
              name="first-level-suggestion"
              placeholder="1st Level Suggestion"
              value="all"
            />
          </div>
          <div class="col-md-3">
            <Select
              :options="brands"
              name="second-level-suggestion"
              placeholder="2nd Level Suggestion"
            />
          </div>
        </div>

        <div class="row mt-4">
          <div class="col-md-7">
            <PhrasesTable
              :labels="['1st level suggestion', '2nd level suggestion', '3rd level suggestion']"
              :tree="report.keyword_tree"
            />
          </div>
          <div class="col-md-5">
            <WordCloud label="1st Layer" />
            <WordCloud label="2nd Layer" containerClass="mt-4" />
            <WordCloud label="3rd Layer" containerClass="mt-4" />
          </div>
        </div>

        <div class="row mt-4">
          <div class="col-md-6">
            <WordCloud label="Top 45% keywords" :keywords="report.keywords" />
          </div>
          <div class="col-md-6">
            <WordCloud label="Top Keywords All" />
          </div>
        </div>

        <div class="row mt-4">
          <div class="col">
            <VerticalChart label="Top Keywords" :xLabels="Object.keys(report.keywords).slice(0, 45)" :yData="topKeywordsChartData" />
          </div>
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
            :labels="false"
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
import Select from "@/components/Shared/FormElements/Select";
import Loader from "@/components/Shared/FormElements/Loader";
import ComparisonTable from '@/components/KeywordExplorer/Table';
import PhrasesTable from '@/components/KeywordExplorer/PhrasesTable';
import WordCloud from '@/components/Shared/Charts/WordCloud';
import VerticalChart from '@/components/Shared/Charts/VerticalChart';

import brands from '@/data/brands';

export default {
  components: {
    Chart,
    ChartTableView,
    Button,
    Input,
    Loader,
    ComparisonTable,
    Select,
    PhrasesTable,
    WordCloud,
    VerticalChart
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
    brands() {
      return brands;
    },
    topKeywordsChartData() {
      return Object.keys(this.report.keywords).map(x => this.report.keywords[x].count).slice(0, 45);
    }
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