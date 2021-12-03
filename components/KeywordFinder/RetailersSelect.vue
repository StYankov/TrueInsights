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
            <div 
                @click="currentCountry = country" 
                v-for="country in countries" 
                :key="country.id" 
                class="retailer-block"
                :class="{selected: (currentCountry && currentCountry.id === country.id)}"
            >
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
    mounted() {
        if(this.countries.length) {
            this.currentCountry = this.countries[0];
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
    width: 45%;

    @include media-breakpoint-up(lg) {
        width: 25%;
    }
}

.retailers-list {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 60%;
    margin-left: 3%;

    @include media-breakpoint-up(lg) {
        flex-direction: row;
        width: 75%;
        margin-left: 1.5%;
    }
}

.retailer-block {
    width: 100%;
    border: 1px solid $dark;
    padding: 0.5rem;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: 1%;
    margin-bottom: 0.35rem;

    font-size: 0.875rem;
    font-weight: 600;
    color: $heading;
    cursor: pointer;
    transition: 0.3s ease-out;

    @include media-breakpoint-up(lg) {
        font-size: 1rem;
        width: 31%;
        padding: 1rem;
        margin-bottom: 1rem;
    }

    .arrow-down {
        width: 0; 
        height: 0; 
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        
        border-top: 10px solid $purple;
    }

    &.selected {
        background-color: $purple;
        color: #fff;
        
        .arrow-down {
            color: #fff;
        }
    }
}
</style>