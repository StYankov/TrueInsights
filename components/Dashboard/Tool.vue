<template>
    <nuxt-link :to="url" class="tool-link">
        <div class="tool-link__icon">
            <img v-if="icon" :src="icon" />
            <img v-else src="/images/logo-icon.png" alt="keyword-finder" />
        </div>
        <h4 class="tool-link__title">{{ title }}</h4>
        <p class="tool-link__desc">{{ description }}</p>
    </nuxt-link>
</template>
<script>
export default {
    props: {
        icon: {
            type: String
        },
        url: {
            type: String,
            default: '#'
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        }
    }
}
</script>
<style lang="scss" scoped>
    .tool-link {
        position: relative;
        border-radius: 1rem;
        padding: 2rem 0.5rem 0.5rem 3rem;
        background: linear-gradient(180deg, rgba(146,78,154,1) 0%, rgba(210,87,242,1) 50%, rgba(189,53,235,1) 100%);
        text-decoration: none;
        width: 100%;
        margin-bottom: 1rem;

        @include media-breakpoint-up(lg) {
            width: 30%;
            margin-right: 3%;
            margin-bottom: 0;
        }

        &__icon {
            position: absolute;
            top: 0.5rem;
            left: 0.5rem;
            width: 32px;
            height: 32px;
            background-color: #fff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;

            img {
                width: 20px;
                height: auto;
            }
        }

        &__title {
            font-size: 1.15rem;
            color: #fff;
            font-weight: bold;
            margin-bottom: 0;
        }

        &__desc {
            color: #fff;
            font-size: 0.9rem;
            padding-right: 1.5rem;
        }
    }
</style>