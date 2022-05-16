<template>
      <div class="container">
            <h3 class="section-title">Product Analyzer Settings</h3>
            <p class="text-muted">You can override the store params used for calculating the total score of a product analysis</p>
            <div class="row stores-settings">
                <div class="col-md-3">
                    <StoreList 
                        :list="stores" 
                        @click="selectStore" 
                        :currentId="current && current.id"
                    />
                </div>
                <div class="col-md-5">
                    <ParamsEditor />
                </div>
            </div>
      </div>
</template>
<script>
import StoreList from '@/components/ProductAnalyzer/Settings/StoreList';
import ParamsEditor from '@/components/ProductAnalyzer/Settings/ParamsEditor';
export default {
    components: { StoreList, ParamsEditor },
    methods: {
        selectStore(store) {
            this.$store.commit('stores/settings/SET_CURRENT', store);
        }
    },
    computed: {
        stores() {
            return this.$store.getters['stores/stores']('product-analyzer');
        },
        current() {
            return this.$store.state.stores.settings.current;
        },
    }
}
</script>