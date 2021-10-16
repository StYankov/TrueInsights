<template>
    <div class="keywords-bag">
        <div v-for="(keyword, i) in keywords" :key="i" class="keywords-bag__item">
            {{ keyword }}
            <button @click="deleteKeyword(keyword)" class="keywords-bag__delete">
                <fa :icon="['fas', 'trash']" />
            </button>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import Button from '../Shared/FormElements/Button.vue';

export default {
    components: { Button },
    methods: {
        deleteKeyword(keyword) {
            this.$store.commit('finder/toggleKeyword', keyword);
        }
    },
    computed: {
        ...mapState('finder', {
            keywords: state => state.finder.keywords
        })
    }
}
</script>
<style lang="scss" scoped>
    .keywords-bag {
        margin-bottom: 1.5rem;

        &__item {
            padding: 4px 8px;
            border-radius: 4px;
            background-color: $gray;
            display: inline-block;
            margin-right: 0.5rem;
            margin-bottom: 0.5rem;
            transition: color 0.2s ease-out;
            user-select: none;

            &:hover {
                background-color: darken($gray, 5%);
            }
        }

        &__delete {
            background-color: transparent;
            border: 0;
            color: $heading;
            transition: color 0.2s ease-out;
            cursor: pointer;

            &:focus {
                outline: none;
            }

            &:hover {
                color: $dark-pink;
            }
        }
    }
</style>