<template>
    <div class="container">
      <div class="page-logo">
        <img src="/images/reviews-analyzer.png" alt="reviews-analyzer" />
      </div>
      <h3 class="section-title">Enter Analyze Name</h3>
      <Input containerClass="mb-4" :value="analyze.name" @input="analyze.name = $event.target.value" />
      
      <div class="input-select">
        <Button @click="$refs.fileUpload.click()">Upload Reviews</Button>
        <input class="file-upload" type="file" ref="fileUpload" accept=".csv">
        <div class="section-separator">Or</div>
        <Button @click="showProductGroups = !showProductGroups">Select Product Group</Button>
      </div>
      
      <transition name="expand">
        <ProductGroupsTable v-if="showProductGroups" @select="selectedGroup = $event" />
      </transition>

      <Button buttonClasses="mt-5 mb-5" @click="loading = true" fluid :disabled="!canProceed">Begin analysis</Button>
    
      <HoriontalLoader v-if="loading" @ready="$router.push('/reviews-analyzer/view')" />
    </div>
</template>
<script>
import Button from '@/components/Shared/FormElements/Button';
import Input from '@/components/Shared/FormElements/Input';

import ProductGroupsTable from '@/components/ReviewsAnalyzer/ProductGroupsTable';
import HoriontalLoader from '@/components/Shared/FormElements/HorizontalLoader';

export default {
    components: {
        Button,
        Input,
        ProductGroupsTable,
        HoriontalLoader
    },
    data() {
        return {
            analyze: {
                name: ''
            },
            showProductGroups: false,
            loading: false,
            selectedGroup: null
        }
    },
    computed: {
        canProceed() {
            return this.analyze.name && this.selectedGroup;
        }
    }
}
</script>
<style lang="scss" src="@/assets/styles/pages/reviews-analyzer.scss"></style>
<style lang="scss" scoped>
    .file-upload {
        position: absolute;
        left: -9999px;
        opacity: 0;
    }
</style>