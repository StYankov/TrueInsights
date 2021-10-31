<template>
    <div class="container">
      <div class="page-logo">
          <img src="/images/keyword-finder.png" alt="keyword-finder" />
      </div>
      <h3 class="section-title">Keyword Explorer</h3>

      <Input placeholder="Search store..." :value="search" @input="search = $event.target.value" />

      <div class="keyword-reports">
        <ListItem
            v-for="(report, index) in reports"
            :key="report.id"
            :report="report"
            :index="index"
        />
      </div>
    </div>
</template>
<script>
import ListItem from '@/components/KeywordFinder/ListItem';

import Input from '@/components/Shared/FormElements/Input';

export default {
    components: {
        ListItem,
        Input
    },
    async asyncData({ store }) { 
        await store.dispatch('finder/getReports');
    },
    data() {
        return {
            search: ''
        }
    },
    computed: {
        reports() {
            return this.$store.state.finder.reports;
        }
    }
}
</script>
<style lang="scss" src="@/assets/styles/pages/finder.scss"></style>