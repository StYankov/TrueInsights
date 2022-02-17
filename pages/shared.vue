<template>
  <div class="container">
    <h3 class="section-title mb-2 mb-lg-4 text-center">Analyzed Product</h3>

    <div class="row mt-5">
      <div class="col">
        <Product v-if="data.product" :product="data.product" />
        <Stats
          v-if="data.statistics"
          :scan="data"
          :stats="data.statistics"
          :product="data.product"
        />
        <Sponsored
          v-if="data"
          :product="data.product"
          :sponsored="data.sponsored"
        />
      </div>
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
  auth: 'guest',
  components: {
    Button,
    Input,
    Product,
    Loading,
    Stats,
    Sponsored
  },
  async asyncData({ store, route, redirect }) {
    const { sid, h } = route.query;

    if(!sid || !h)
      redirect('/');

    const result = await store.dispatch("analyzer/getSharedItem", {
      sid,
      hash: h
    });

    if (!result) return redirect("/");
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    data() {
      return this.$store.state.analyzer.scan;
    },
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