<template>
    <div class="container">
      <div class="page-logo">
          <img src="/images/keyword-finder.png" alt="keyword-finder" />
      </div>
      <div class="page-head">
        <h3 class="section-title">Keyword Research</h3>
        <Button @click="goToCreateReport">Create Report</Button>
      </div>

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
import Button from '@/components/Shared/FormElements/Button';

export default {
    components: {
        ListItem,
        Button
    },
    async asyncData({ store }) { 
        await store.dispatch('finder/getReports');
    },
    methods: {
        goToCreateReport() {
            this.$router.push('/finder/create');
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