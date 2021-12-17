<template>
    <div class="product-box row">
        <div class="col-md-4">
            <img :src="image" />
        </div>
        <div class="col-md-7">
            <p class="product-category mb-4">{{ categoryChain }}</p>
            <h2 class="mb-4">{{ product.title }}</h2>

            <h5>Description</h5>

            <p class="mb-1" v-if="product.description.length > 200 && showMore === false">{{ product.description.slice(0, 200) }}</p>
            <a class="read-more" v-if="product.description.length > 200 && showMore === false" href="#" @click.prevent="showMore = true">Show more</a>
            <p v-if="showMore" class="mb-2" v-html="product.description"></p>
            <a class="mb-1 read-more" href="#" v-if="product.description.length > 200 && showMore" @click.prevent="showMore = false">Show less</a>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        product: {
            type: Object,
            required: true,
            default: () => {}
        }
    },
    data() {
        return {
            showMore: false
        }
    },
    computed: {
        image() {
            return this.product.images.length > 0 ? this.product.images[0] : ''
        },
        categoryChain() {
            return this.product.categories.join(' > ')
        }
    }
}
</script>
<style lang="scss" scoped>
    .product-box {
        margin-bottom: 2rem;
        img {
            width: 200px;
            max-width: 100%;
            height: auto;
        }

        .product-category {
            font-size: 0.85rem;
            font-weight: 600;
        }
    }

    .read-more {
        text-decoration: none;
    }
</style>