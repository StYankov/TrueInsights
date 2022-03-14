<template>
  <div class="group-section" :class="{closed: !show}">
    <div @click="show = !show" class="section-title">
      <h4>
          {{ store }} 
          <template v-if="show">
            <fa :icon="['fa', 'chevron-down']" />
          </template>
          <template v-else>
            <fa :icon="['fa', 'plus']" />
          </template>
        </h4>
    </div>
    <div class="section-content">
        <GroupRow v-for="group in products" :key="group._id" :group="group" />
    </div>
  </div>
</template>
<script>
import GroupRow from '@/components/ProductAnalyzer/Groups/GroupRow';

export default {
    components: { GroupRow },
    props: ['products', 'store'],
    data() {
        return {
            show: true
        }
    }
}
</script>
<style lang="scss" scoped>
.group-section {
    .section-title {
        width: 100%;
    }

    h4 {
        display: flex;
        justify-content: space-between;
        cursor: pointer;
    }

    .section-content {
        max-height: 10000px;
    }

    &.closed {
        .section-content {
            max-height: 0;
            overflow: hidden;
        }
    }
}
</style>