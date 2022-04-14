<template>
    <div class="container">
        <div class="mb-3 d-flex justify-content-between align-items-center">
            <h3>{{ group.name }}</h3>
            <Button medium @click="exportData">Export</Button>
        </div>
        <Filters />

        <div class="group-products">
            <GroupSection v-for="(value, key) in products" :store="key" :products="value" :key="key" />
        </div>
    </div>
</template>
<script>
import GroupSection from '@/components/ProductAnalyzer/Groups/GroupSection';
import Filters from '@/components/ProductAnalyzer/Filters';
import Button from '@/components/Shared/FormElements/Button';

export default {
    components: {
        GroupSection,
        Filters,
        Button
    },
    async asyncData({ store, params, redirect }) {
        const [result, error] = await store.dispatch('groups/getGroup', params.id);

        if(error)
            return redirect('/');
    },
    methods: {
        async exportData() {
            await this.$store.dispatch('groups/export', this.group._id);
        }
    },
    computed: {
        group() {
            return this.$store.state.groups.group;
        },
        products() {
            return this.$store.getters['groups/products'];
        }
    }
}
</script>