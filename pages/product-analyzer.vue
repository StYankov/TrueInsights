<template>
  <div class="container">
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
      <template v-if="loading">
        <div class="loader-container">
          <Loading />
          This may take a while
        </div>
      </template>

      <template v-if="scan">
        <div class="col">
          <Product v-if="scan.product" :stats="scan.statistics" :product="scan.product" />
          <Stats v-if="scan.statistics" :scan="scan" :stats="scan.statistics" :product="scan.product" />
          <Sponsored 
            v-if="scan && scan.sponsored" 
            :product="scan.product" 
            :sponsored="scan.sponsored"
          />
        </div>
      </template>

      <template v-if="error">
        <h3 class="text-center">{{ error }}</h3>
      </template>
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

export default {
  components: {
    Button,
    Input,
    Product,
    Loading,
    Stats,
    Sponsored
  },
  data() {
    return {
      loading: false,
      error: false,
      scan: null,
      url: "",
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
        this.error = true;
        this.$swal.fire(
            'Warning',
            this.getError(err),
            'warning'
        );
      }

      this.loading = false;
    },
    getError(data) {
        if(data.response && data.response.data && data.response.data.errors) {
            const errors = data.response.data.errors;

            return errors[Object.keys(errors)[0]][0];
        }

        return 'Unexpected Error. Please try again';
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