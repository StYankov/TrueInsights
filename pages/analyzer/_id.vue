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
          v-if="data && data.sponsored"
          :product="data.product"
          :sponsored="data.sponsored"
        />
      </div>
    </div>

    <div class="row mt-4 d-flex justify-content-between">
        <Button @click="$router.back()">Back</Button>
        <div class="shareable">
          <Button small @click="share">Share</Button>
          <div v-if="shareObj" class="input-box">
            <input ref="inputField" @click="onFocus" type="text" :value="`https://trueinsights.tech/shared?sid=${shareObj.scan_id}&h=${shareObj.hash}`" />
          </div>
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
  components: {
    Button,
    Input,
    Product,
    Loading,
    Stats,
    Sponsored
  },
  async asyncData({ store, params, redirect }) {
    const result = await store.dispatch("analyzer/getHistoryItem", params.id);
    if (!result) return redirect("/");
  },
  data() {
    return {
      loading: false,
      shareObj: null
    };
  },
  methods: {
    async share() {
      const response = await this.$axios.post(`/product-scans/share/${this.data._id}`);

      this.shareObj = response.data;

      this.$refs.inputField && this.$refs.inputField.$el.focus();
    },
    onFocus(e) {
      e.target.select();
    }
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
.shareable {
  position: relative;

  .input-box {
    position: absolute;
    top: 95%;
    right: 0;
    width: 300px;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 4px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    overflow: hidden;

    input {
      border: 0;
      height: 36px;
      padding: 3px 5px;
      width: 100%;

      &:focus {
        outline: none;
        border: 0;
      }
    }
  }
}
</style>