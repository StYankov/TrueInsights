<template>
    <table class="table" v-if="urls.length">
        <thead>
            <tr>
                <th>URL</th>
                <th>Store</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, i) in urls" :key="i" :class="{'row-invalid': !item.valid}">
                <td v-if="item.valid"><a :href="item.url">{{ item.url }}</a></td>
                <td v-else>{{ item.url }}</td>

                <td>{{ item.store || '' }}</td>
                <td>
                    <button type="button" @click="$emit('remove', i)" class="btn button">
                        <fa :icon="['fa', 'times']" />
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script>
export default {
    props: {
        urls: {
            type: Array,
            required: false,
            default: () => []
        }
    }
}
</script>
<style scoped>
.row-invalid {
    color: brown !important;
}
</style>