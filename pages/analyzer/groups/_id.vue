<template>
    <div class="container">
        <h3 class="mb-5">{{ group.name }}</h3>

        <div class="group-products">
            <GroupRow v-for="group in group.products" :key="group._id" :group="group" />
        </div>
    </div>
</template>
<script>
import GroupRow from '@/components/ProductAnalyzer/Groups/GroupRow';

export default {
    components: {
        GroupRow
    },
    async asyncData({ store, params, redirect }) {
        const [result, error] = await store.dispatch('groups/getGroup', params.id);

        if(error)
            return redirect('/');
    },
    methods: {

    },
    computed: {
        group() {
            return this.$store.state.groups.group;
        }
    }
}
</script>