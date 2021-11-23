<template>
  <div class="comparison-table">
    <table class="table">
      <thead v-if="labels">
        <tr>
          <th v-for="label in labels" :key="label">{{ label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td rowspan="4">One</td>
          <td rowspan="2">One</td>
          <td>One</td>
        </tr>
        <tr>
          <td>One</td>
        </tr>
        <tr>
          <td>One</td>
        </tr>
        <tr>
          <td>One</td>
          <td>One</td>
        </tr>
        <!-- <tr v-for="(items, keyword) in tree" :key="keyword">
                    <td :rowspan="Object.keys(items[keyword]).length">{{ keyword }}</td>
                    <td>{{ items }}</td>
                </tr> -->
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: ["labels", "tree"],
  mounted() {
    // console.log(this.tre)
  },
  computed: {
    filteredData() {
      if (!this.orderMethod) return this.rows;

      const sorted = [...this.rows].sort((first, second) => {
        return second[this.orderMethod] - first[this.orderMethod];
      });

      if (this.orderType === "asc") return sorted.reverse();

      return sorted;
    },
  },
};
</script>
<style lang="scss" scoped>
.comparison-table {
  &__title {
    text-align: center;
    margin-bottom: 1rem;
  }

  table {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border-radius: 3px;
    overflow: hidden;

    thead th {
      background-color: $menu-dark;
      color: #fff;
    }

    tbody tr:nth-of-type(even) td {
      background-color: #f3f3f3;
    }
  }

  th {
    cursor: pointer;
    user-select: none;
  }

  .position-up,
  .position-down {
    font-weight: bold;
  }

  .position-up {
    svg {
      color: #27ae60;
    }
  }

  .position-down {
    svg {
      color: #e74c3c;
    }
  }
}
</style>