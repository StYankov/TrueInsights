<template>
    <div class="row mb-4">
        <div class="col-md-3">
            <Select 
                placeholder="Store"
                id="store-filter"
                :options="options"
                defaultValue="All"
                multiple
                @change="onStoreSelect"
            />
        </div>
        <div class="col-md-3">
            <Input
                label="Keyword"
                name="keyword"
                @input="onKeywordInput"
            />
        </div>
        <!-- <div class="col-md-3 d-flex align-items-end">
            <Button buttonClasses="mb-1" medium>Filter</Button>
        </div> -->
    </div>
</template>
<script>
import Select from '@/components/Shared/FormElements/Select';
import Input from '@/components/Shared/FormElements/Input'
import Button from '@/components/Shared/FormElements/Button';

export default {
    components: { Select, Input, Button },
    methods: {
        onStoreSelect(values) {
            this.$store.commit('groups/setFilter', { key: 'stores', filter: values.map(x => x.slug) });
        },
        onKeywordInput(e) {
            this.$store.commit('groups/setFilter', { key: 'keyword', filter: e.target.value.toLowerCase() });
        },
    },
    computed: {
        options() {
            const stores = this.$store.getters['groups/stores'];

            const options = [];
            for(const storeSlug in stores) {
                const store = stores[storeSlug];

                options.push({
                    slug: storeSlug,
                    label: store.name,
                    country: store.country
                });
            }

            return options;
        }
    }
}
</script>