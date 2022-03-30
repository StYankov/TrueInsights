<template>
    <nuxt-link :to="url" class="keyword-item animate__animated animate__fadeInDown" :style="animationDelay">
        <h2 class="keyword-item__name">{{ store.view_name }}</h2>
        <!-- <p class="keyword-item__summary">{{ store.description }}</p> -->

        <span class="keyword-item__more">
            <fa :icon="['fas', 'cog']" />
        </span>
    </nuxt-link>
</template>
<script>
export default {
    props: {
        store: {
            type: Object,
            required: true,
            default: () => {}
        },
        index: {
            type: Number,
            required: false
        }
    },
    computed: {
        url() {
            return `/analytics/view/${this.store.id}`;
        },
        animationDelay() {
            const index = this.index || 0;
            return {
                animationDelay: `${index / 10}s`
            };
        },
        countries() {
            const countries = this.report.stores.map(x => x.country.slug);

            return [...new Set(countries)].map(x => x.toUpperCase());
        }
    }
}
</script>
<style lang="scss" scoped>
    .keyword-item {
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
    }

    .keyword-item__name {
        font-weight: 800;
        font-size: 1.4rem;
        color: $heading;
        margin-bottom: 0.5rem;
    }

    .keyword-item__summary {
        font-size: 0.85rem;
        font-weight: 600;
        color: lighten($dark, 10%);
        margin-bottom: 0.7rem;
    }

    .keyword-item__more {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        color: $accent;
        transition: 0.2s ease-out;
        opacity: 0.4;

        &:hover {
            opacity: 1;
        }
    }
</style>