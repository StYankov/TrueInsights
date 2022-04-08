<template>
  <div class="row group-selectors">
    <div class="col-md-3">
      <div class="p-group">
        <h5 class="p-group__label">Available Groups</h5>
        <div class="p-group__list">
          <div class="p-group__search-group">
            <fa class="icon" :icon="['fas', 'search']" />
            <input
              type="text"
              class="p-group__search"
              placeholder="Search Group"
              v-model="search"
            />
          </div>
          <div class="p-group__items">
            <div v-for="group in groups" :key="group._id" class="p-group__item">
              {{ group.name }} <fa @click="toggleGroup(group._id)" :icon="['fas', 'plus']" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="p-group selected-groups">
        <h5 class="p-group__label">Selected Groups</h5>
        <div class="p-group__list">
            <div class="p-group__items">
                <div v-for="group in selectedGroups" :key="group._id" class="p-group__item animate__animated animate__fadeInRight">
                    <span>
                      {{ group.name }} - <strong>{{ groupSkus(group._id) }}</strong>
                    </span>
                    <fa @click="toggleGroup(group._id)" :icon="['fas', 'times']" />
                </div>
            </div>
        </div>
      </div>
    </div>

    <div class="col-md-3 d-flex align-items-center">
      <Button @click="analyze">Analyze</Button>
    </div>
  </div>
</template>
<script>
import Button from "@/components/Shared/FormElements/Button";

export default {
  components: { Button },
  data() {
      return {
          search: ''
      }
  },
  methods: {
      toggleGroup(groupId) {
          this.$store.commit('scorecard/TOGGLE_GROUP', groupId);
          this.$store.dispatch('scorecard/getAvailableFilters');
      },
      analyze() {
        this.$store.dispatch('scorecard/calculateScorecard');
      },
      groupSkus(groupId) {
        const group = this.$store.getters['groups/getGroup'](groupId);

        return group ? group.urls.length : 0;
      }
  },
  computed: {
    groups() {
        let groups = this.$store.state.groups.data
            .filter(x => this.selectedIds.indexOf(x._id) === -1)
            .filter(x => x.name.indexOf(this.search) !== -1);
        return groups;
    },
    selectedIds() {
        return this.$store.state.scorecard.selected;
    },
    selectedGroups() {
        return this.$store.getters['scorecard/selectedGroups'];
    }
  },
};
</script>