<template>
    <nuxt-link :to="url" class="keyword-explorer-item animate__animated animate__fadeInDown" :style="animationDelay">
        <h2 class="keyword-explorer-item__name">{{ store.name }}</h2>
        <p class="keyword-explorer-item__country">{{ store.country && store.country.name }}</p>

        <p v-if="store.last_explore" class="keyword-explorer-item__date">Last report: {{ lastExploreDate }}</p>
    </nuxt-link>
</template>
<script>
export default {
    props: {
        store: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: false
        }
    },
    computed: {
        animationDelay() {
            const index = this.index || 0;
            return {
                animationDelay: `${index / 10}s`
            };
        },
        url() {
            return `/explorer/view/${this.store.id}`;
        },
        lastExploreDate() {
            if(!this.store.last_explore)
                return;
            
            return new Date(this.store.last_explore).toLocaleString().slice(0, 10).replace(/\//g, '.');
        }
    }
}
</script>
<style lang="scss" scoped>
.keyword-explorer-item {
    position: relative;
    padding: 1rem;
    border-radius: 1rem;
    background-color: #fff;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%);
    text-decoration: none;
    width: 100%;
    margin-bottom: 2rem;
    overflow: hidden;

    @include media-breakpoint-up(lg) {
        width: 31.5%;
        margin-right: 1.6%;
    }

    &__name {
        font-weight: 800;
        font-size: 1.4rem;
        color: $heading;
        margin-bottom: 0.5rem;
    }

    &__country {
        font-size: 0.85rem;
        font-weight: 600;
        color: lighten($dark, 10%);
        margin-bottom: 0.7rem;
    }

    &__date {
        color: $heading;
        font-weight: 600;
        margin-top: 0.5rem;
        font-size: 0.8rem;
        text-align: right;
        margin-bottom: 0;
    }
}
</style>