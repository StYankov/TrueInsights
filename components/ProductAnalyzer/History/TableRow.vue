<template>
    <tr>
        <td>{{ product.title }}</td>
        <td><a :href="product.url">{{ product.url }}</a></td>
        <td>{{ store }}</td>
        <td>{{ createdAt }}</td>
        <td><nuxt-link class="btn btn-sm btn-secondary" :to="`/analyzer/${data._id}`">View</nuxt-link></td>
    </tr>
</template>
<script>
export default {
    props: ['data'],
    computed: {
        product() {
            return this.data.product;
        },
        store() {
            return this.data.store;
        },
        createdAt() {
            const date = new Date(this.data.created_at);
            
            const day = date.getDate();
            const month = date.getMonth() + 1;

            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            
            return `${day}.${month}.${date.getFullYear()} ${hours}:${minutes}`;
        }
    }
}
</script>