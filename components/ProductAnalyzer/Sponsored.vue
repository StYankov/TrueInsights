<template>
<div class="sponsored-terms">
    <h4 class="mb-3">Sponsored Search Terms by Brand in {{ product.category }}</h4>
    <template>
        <table class="table">
            <thead>
                <th>Brand</th>
                <th colspan="3">Search terms</th>
            </thead>
            <tbody>
                <tr v-for="data, brand in sponsored.sponsored_by_brand" :key="brand">
                    <td>{{ brand }}</td>
                    <td colspan="3">{{ data.join(', ') }}</td>
                </tr>
            </tbody>
        </table>

        <div class="sponsored-by-tena" v-if="sponsored.not_sponsored_by_brand.length">
            <h5>Terms sponsored by competition but not by {{ product.brand }}</h5>
            <div class="terms-list">
                <div class="term" v-for="term in sponsored.not_sponsored_by_brand" :key="term" v-html="term"></div>
            </div>
        </div>
    </template>
</div>
</template>
<script>

export default {
    props: ['product', 'sponsored']
}
</script>
<style scoped>
    .terms-list {
        display: flex;
        flex-wrap: wrap;
    }

    .term {
        background-color: #6c5ce7;
        border-radius: 8px;
        color: #fff;
        padding: 4px 10px;
        font-weight: 600;
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
    }
</style>