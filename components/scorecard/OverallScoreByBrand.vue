<template>
  <div class="table-responsive">
    <table class="table table-bordered scorecard-table">
      <thead>
        <tr>
          <th v-for="col in headers" :key="col" v-html="col" />
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row[0]">
          <td
            v-for="(col, index) in row"
            :key="index"
            v-html="col"
            :class="getCellClass(col)"
          />
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: ["data"],
  methods: {
    getCellClass(value) {
      if (typeof value === "string") return "";

      if (value >= 85) return "status-good";

      if (value >= 50) return "status-ok";

      return "status-bad";
    },
  },
  computed: {
    headers() {
      return ["Total Brand Health", ...this.data[0]];
    },
    rows() {
      return this.data.slice(1);
    },
  },
};
</script>
<style scoped>
.status-good {
  background: #75fb4c;
}

.status-ok {
  background-color: #ffff55;
}

.status-bad {
  background-color: #d85040;
}
</style>