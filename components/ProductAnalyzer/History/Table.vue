<template>
    <table class="table">
        <thead>
            <tr>
                <th>Title</th>
                <th>URL</th>
                <th>Store</th>
                <th>Date</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <TableRow v-for="item in data" :key="item._id" :data="item" />
        </tbody>
    </table>
</template>
<script>
import TableRow from '@/components/ProductAnalyzer/History/TableRow';

export default {
    components: {
        TableRow
    },
    computed: {
        data() {
            return this.$store.getters['analyzer/history'];
        }
    }
}
</script>