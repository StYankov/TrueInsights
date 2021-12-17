<template>
<div class="sponsored-terms">
    <h4 class="mb-3">Sponsored Search Terms by Brand in {{ product.category }}</h4>
    <Loader v-if="loading" />
    <template v-else>
        <table class="table">
            <thead>
                <th>Brand</th>
                <th colspan="3">Search terms</th>
            </thead>
            <tbody>
                <tr v-for="data, brand in grouped_by_brands" :key="brand">
                    <td>{{ brand }}</td>
                    <td colspan="3">{{ data.join(', ') }}</td>
                </tr>
            </tbody>
        </table>

        <div class="sponsored-by-tena" v-if="not_sponsored_by_current_brand.length">
            <h5>Terms sponsored by competition but not by {{ product.brand }}</h5>
            <div class="terms-list">
                <div class="term" v-for="term in not_sponsored_by_current_brand" :key="term" v-html="term"></div>
            </div>
        </div>
    </template>
</div>
</template>
<script>
import Loader from '@/components/Shared/FormElements/Loader';

export default {
    components: { Loader },
    props: ['product'],
    data() {
        return {
            sponsored_terms: [],
            sponsored_by_current_brand: [],
            not_sponsored_by_current_brand: [],
            grouped_by_brands: [],
            loading: false
        }
    },
    mounted() {
        this.getSponsoredTerms();
    },
    methods: {
        async getSponsoredTerms() {
            const response = await this.$axios.post('sponsored-terms', {
                'brand': this.product.brand,
                'category': this.product.category
            });

            this.sponsored_terms = response.data.sponsored_terms;
            this.sponsored_by_current_brand = response.data.sponsored_by_current_brand;
            this.grouped_by_brands = response.data.sponsored_by_brand;
            this.not_sponsored_by_current_brand = response.data.not_sponsored_by_brand;
        }
    }
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