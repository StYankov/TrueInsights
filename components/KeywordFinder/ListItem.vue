<template>
    <nuxt-link :to="url" class="keyword-item animate__animated animate__fadeInDown" :style="animationDelay">
        <h2 class="keyword-item__name">{{ report.name }}</h2>
        <p class="keyword-item__summary">{{ summary }}</p>
        <span class="keyword-item__markets">
            <span v-for="country in countries" :key="country" class="keyword-item__market">{{ country }}</span>
        </span>

        <span class="keyword-item__more">
            <fa :icon="['fas', 'cog']" />
        </span>

        <span class="keyword-item__status" :class="statusClass">
            {{ status }}
        </span>
    </nuxt-link>
</template>
<script>
export default {
    props: {
        report: {
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
            return `/finder/view/${this.report._id}`;
        },
        summary() {
            const keywordsCount = this.report.keywords.length;
            const keywordWord = keywordsCount === 1 ? 'keyword' : 'keywords';

            const storesCount = this.report.stores.length;
            const storeWord = storesCount === 1 ? 'store' : 'stores';

            return `${keywordsCount} ${keywordWord} in ${storesCount} ${storeWord}`;
        },
        status() {
            return this.report.status.charAt(0).toUpperCase() + this.report.status.slice(1);
        },
        statusClass() {
            return `keyword-item__status--${this.report.status.toLowerCase()}`;
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

    .keyword-item__markets {
        display: flex;
    }

    .keyword-item__market {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background-color: $heading;
        margin-right: 0.3rem;
        color: #fff;
        font-weight: 900;
        font-size: 0.6rem;
        line-height: 1;
        width: 26px;
        height: 26px;
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

    .keyword-item__status {
        position: absolute;
        bottom: 0;
        right: 0;
        font-size: 0.8rem;
        font-weight: bold;
        color: #fff;
        line-height: 1;
        border-top-left-radius: 1rem;
        padding: 0.4rem 0.6rem;
        background-color: $purple;

        &--queued {
            background-color: #17c0eb;
        }

        &--processing {
            background-color: #7d5fff;
        }

        &--ready {
            background-color: #3ae374;
        }
    }
</style>