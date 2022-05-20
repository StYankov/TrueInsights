<template>
  <div class="container container-big">
    <h3 class="section-title mb-2 mb-lg-4 text-center">Product Analyzer</h3>

    <div class="row justify-content-center">
      <div class="col-8 d-flex flex-column align-items-center">
        <Input
          containerClass="mb-3"
          :value="url"
          @input="url = $event.target.value"
        />
        <Button @click="analyzeProduct">Inspect</Button>
      </div>
    </div>

    <div class="row mt-5">
      <UnsupportedStores v-if="unknownStore" @send="notify" @close="unknownStore = false" />
      <template v-if="loading">
        <div class="loader-container">
          <Loading />
          This may take a while
        </div>
      </template>

      <template v-if="scan">
        <div class="col">
          <Product v-if="scan.product" :stats="scan.statistics" :product="scan.product" />
          <MobileOptimizedScore v-if="scan.mobile_optimized" :imageData="scan.mobile_optimized" /> 
          <Heatmaps v-if="scan.heatmaps" :heatmaps="scan.heatmaps" :blur="scan.blur" />
          <Stats v-if="scan.statistics" :scan="scan" :stats="scan.statistics" :product="scan.product" />
          <Sponsored 
            v-if="scan && scan.sponsored" 
            :product="scan.product" 
            :sponsored="scan.sponsored"
          />
        </div>
      </template>

      <template v-if="!scan && !loading">
        <SupportedStores />
      </template>

      <!-- <template v-if="error">
        <h3 class="text-center">{{ error }}</h3>
      </template> -->
    </div>
  </div>
</template>
<script>
import Button from "@/components/Shared/FormElements/Button";
import Input from "@/components/Shared/FormElements/Input";
import Loading from "@/components/Shared/FormElements/Loader";

import Product from "@/components/ProductAnalyzer/Product";
import Stats from "@/components/ProductAnalyzer/Stats";
import Sponsored from "@/components/ProductAnalyzer/Sponsored";
import Heatmaps from '@/components/ProductAnalyzer/Heatmaps';

import SupportedStores from "@/components/ProductAnalyzer/SupportedStores";
import UnsupportedStores from "@/components/ProductAnalyzer/UnsupportedStore";
import MobileOptimizedScore from "@/components/ProductAnalyzer/MobileOptimizedScore";

export default {
  components: {
    Button,
    Input,
    Product,
    Loading,
    Stats,
    Sponsored,
    SupportedStores,
    UnsupportedStores,
    Heatmaps,
    MobileOptimizedScore
  },
  data() {
    return {
      loading: false,
      error: false,
      scan: null,
      url: "",
      unknownStore: false
    };
  },
  methods: {
    async analyzeProduct() {
      if(!this.url) return;

      this.error = false;
      this.loading = true;
      this.scan = null

      try {
        const response = await this.$axios.post("/product-analyzer", { url: this.url });
        this.scan = response.data;

        if(!this.scan) {
          this.error = 'We were unable to fetch details about the product. The store is too busy now';
          return;
        }

        this.product = response.data.product;
        this.statistics = response.data.statistics;
        this.sponsored  = response.data.sponsored;
      } catch (err) {
        if(err.response && err.response.data)
          this.getError(err.response.data);

        this.error = true;
      }

      this.loading = false;
    },
    async notify() {
      try {
        await this.$axios.post('/monday/notify', { url: this.url });
      } catch(e) {}

      this.unknownStore = false;
    },
    getError(data) {
      if(data.status === 'STORE_UNKNOWN') {
        this.unknownStore = true;
      }
        // if(data.response && data.response.data && data.response.data.errors) {
        //     const errors = data.response.data.errors;

        //     return errors[Object.keys(errors)[0]][0];
        // }

        // return 'Unexpected Error. Please try again';
    }
  },
};
</script>
<style lang="scss" scoped>
.loader-container {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
}
</style>