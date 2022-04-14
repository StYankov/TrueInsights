<template>
  <div class="container">
      <div class="page-head mb-4">
        <h3 class="section-title">Product Groups</h3>
        <Button medium @click="$router.push('/product-groups/create')">
            <fa :icon="['fas', 'plus']" /> Create Group
        </Button>
      </div>
      <table class="table product-groups">
          <thead>
              <tr>
                  <th>Name</th>
                  <th class="head-products">Products</th>
                  <th>Overal Score</th>
                  <th class="head-status">Status</th>
                  <th>Date</th>
                  <th></th>
              </tr>
          </thead>
          <tbody>
              <TableRow v-for="group in groups" :key="group._id" :group="group"  />
          </tbody>
      </table>

      <Pagination
        :total="total"
        :current="current"
        @changePage="changePage"
      />
  </div>
</template>
<script>
import Button from '@/components/Shared/FormElements/Button';
import TableRow from '@/components/ProductAnalyzer/Groups/TableRow';
import Pagination from '@/components/Shared/Pagination';

export default {
    components: { TableRow, Button, Pagination },
    async asyncData({ store, redirect }) {
        const [_, error] = await store.dispatch('product-groups/getGroups');

        if(error)
            return redirect('/');
    },
    methods: {
        changePage(page) {
            this.$store.dispatch('product-groups/getGroups', page);
        }
    },
    computed: {
        groups() {
            return this.$store.getters['product-groups/groups'];
        },
        current() {
            return this.$store.state['product-groups'].page;
        },
        total() {
            return this.$store.state['product-groups'].totalPages;
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