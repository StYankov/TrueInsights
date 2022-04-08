<template>
    <div class="scorecard-filters">
        <div class="form-group">
            <Select
                defaultValue="All Retailers"
                placeholder="Retailers"
                multiple
                :options="retailers"
                @change="onFilterChange($event, 'retailers')"
            />
        </div>

        <div class="form-group">
            <Select
                defaultValue="All Brands"
                placeholder="Brands"
                name="brand"
                multiple
                :options="brands"
                @change="onFilterChange($event, 'brands')"
            />
        </div>

        <Button @click="analyze" small>Filter</Button>
    </div>
</template>
<script>
import Select from '@/components/Shared/FormElements/Select';
import Button from '@/components/Shared/FormElements/Button';

export default {
    components: { Select, Button },
    methods: {
        onFilterChange(values, name) {
            this.$store.commit('scorecard/SELECT_FILTER', {
                key: name,
                filters: values.map(x => x.code)
            });
        },
        analyze() {
            this.$store.dispatch('scorecard/calculateScorecard');
        },
    },
    computed: {
        availableFilters() {
            return this.$store.state.scorecard.filters || {};
        },
        brands() {
            if(!this.availableFilters.brands)
                return [];


            return this.availableFilters.brands.map(x => ({ label: x, code: x }));
        },
        retailers() {
            if(!this.availableFilters.retailers)
                return [];

            return this.availableFilters.retailers.map(x => ({ label: x, code: x }));
        }
    }
}
</script>