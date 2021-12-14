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
      <template v-else>
        <div class="col">
          <Product v-if="product" :product="product" />
          <Stats v-if="statistics" :stats="statistics" />
        </div>
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

export default {
  components: {
    Button,
    Input,
    Product,
    Loading,
    Stats,
  },
  data() {
    return {
      url: "",
      product: null,
      statistics: null,
      loading: false,
      erorr: false,
    };
  },
  methods: {
    async analyzeProduct() {
      if(!this.url) return;

      this.error = false;
      this.loading = true;

      try {
        const response = await this.$axios.post("/product-analyzer", {
          url: this.url,
        });

        this.product = response.data.product;
        this.statistics = response.data.statistics;
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