<template>
    <div class="retailers-select">
        <div class="retailers-current">
            <div v-if="currentCountry" class="retailer-block">
                {{ currentCountry.name }}
                <span class="arrow-down"></span>
            </div>

            <div class="retailers-choices">
                <Checkbox
                    v-for="store in filteredStores" 
                    :label="store.name" 
                    :key="store.id"
                    :name="store.slug"
                    :checked="finder.stores.indexOf(store.id) !== -1"
                    @change="toggleStore(store.id)"
                />
            </div>
        </div>

        <div class="retailers-list">
            <div @click="currentCountry = country" v-for="country in countries" :key="country.id" class="retailer-block">
                {{ country.name }}
                <span class="arrow-down"></span>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import Checkbox from '@/components/Shared/FormElements/Checkbox';

export default {
    components: { Checkbox },
    data() {
        return {
            currentCountry: null
        }
    },
    methods: {
        toggleStore(storeId) {
            this.$store.commit('finder/toggleStore', storeId);
        }
    },
    computed: {
        ...mapState('finder', {
            countries: state => state.countries,
            stores: state => state.stores,
            finder: state => state.finder,
        }),
        filteredStores() {
            if(!this.currentCountry)
                return [];

            return this.stores.filter(x => x.country_id === this.currentCountry.id);
        }
    }
}
</script>
<style lang="scss" scoped>
.retailers-select {
    display: flex;
    flex-direction: row;
    margin-bottom: 2.5rem;
}

.retailers-current {
    width: 25%;
}

.retailers-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    width: 75%;
    margin-left: 1.5%;

    .retailer-block {
        width: 31%;
    }
}

.retailer-block {
    border: 1px solid $dark;
    border-radius: 5px;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    margin-right: 1%;

    font-weight: 600;
    color: $heading;
    cursor: pointer;

    .arrow-down {
        width: 0; 
        height: 0; 
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        
        border-top: 10px solid $purple;
    }

    &.selected {
        background-color: $purple;
        
        .arrow-down {
            color: #fff;
        }
    }
}
</style>