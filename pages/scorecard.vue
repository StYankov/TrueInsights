<template>
  <div class="container">
    <div class="page-head">
      <h3 class="section-title">My Scorecards</h3>
    </div>
    <GroupSelector />
    <Filters />

    <template v-if="scorecard">
      <!-- <Tabs /> -->
      <RetailerDashboard v-for="item in scorecard" :scorecard="item" :key="item.brand" />
    </template>


  </div>
</template>
<script>
import GroupSelector from '@/components/scorecard/GroupSelectors';
import Filters from '@/components/scorecard/Filters';
import RetailerDashboard from '@/components/scorecard/RetailersDashboard';
import Tabs from '@/components/scorecard/Tabs';

export default {
    components: { 
        GroupSelector,
        Filters,
        RetailerDashboard,
        Tabs
    },
    async asyncData({ store }) {
        await store.dispatch('groups/getGroups');
    },
    computed: {
      scorecard() {
        return this.$store.state.scorecard.scorecard;
      }
    }
};
</script>