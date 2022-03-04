<template>
  <div class="container">
      <div class="page-head mb-4">
        <h3 class="section-title">Product Groups</h3>
        <Button medium @click="$router.push('/analyzer/groups/create')">
            <fa :icon="['fas', 'plus']" /> Create Group
        </Button>
      </div>
      <table class="table product-groups">
          <thead>
              <tr>
                  <th class="head-select"></th>
                  <th>Name</th>
                  <th class="head-products">Products</th>
                  <th>Overal Score</th>
                  <th class="head-status">Status</th>
                  <th>Date</th>
              </tr>
          </thead>
          <tbody>
              <TableRow v-for="group in groups" :key="group._id" :group="group"  />
          </tbody>
      </table>
  </div>
</template>
<script>
import Button from '@/components/Shared/FormElements/Button';
import TableRow from '@/components/ProductAnalyzer/Groups/TableRow';

export default {
    components: { TableRow, Button },
    async asyncData({ store, redirect }) {
        const [response, error] = await store.dispatch('groups/getGroups');

        if(error)
            return redirect('/');
    },
    computed: {
        groups() {
            return this.$store.state.groups.data;
        }
    }
};
</script>
<style scoped>
    .product-groups {
        border: 1px solid #dee2e6;
    }

    .product-groups thead {
        background-color: #f3f2f7;
        font-size: 12px;
        text-transform: uppercase;
    }

    .product-groups thead th {
        padding: 0.75rem 1.5rem;
    }

    .product-groups .head-select {
        padding: 0;
    }
</style>