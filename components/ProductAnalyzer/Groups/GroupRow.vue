<template>
    <div class="group-row">
        <div class="product-summary">
            <a target="_blank" class="product-thumb" :href="product.url">
                <img :src="product.thumb_url" />
            </a>
            <a target="_blank" class="product-title" :href="product.url">{{ product.title }}</a>
        </div>

        <div class="health-bar">
            <ProductHealth :stats="group.statistics" />
        </div>
        <div class="product-actions">
            <div class="suggestions">
                <p>Recommended description length is above <strong>{{ group.statistics.description.average }}</strong> characters </p>
                <p>Recommended title length is above <strong>{{ group.statistics.title.average }}</strong> characters </p>
                <p>Optimal image count is <strong>{{ group.statistics.images.average }}</strong></p>
            </div>

            <div class="buttons w-100 d-flex justify-content-end">
                <Button small @click="$router.push(analyzerUrl)">View</Button>
            </div>
        </div>
    </div>
</template>
<script>
import ProductHealth from '@/components/ProductAnalyzer/ProductHealth.vue';
import Button from '@/components/Shared/FormElements/Button';

export default {
    components: {
        ProductHealth,
        Button
    },
    props: {
        group: {
            type: Object,
            required: true
        }
    },
    computed: {
        product() {
            return this.group.product;
        },
        analyzerUrl() {
            return `/analyzer/${this.group._id}`;
        }
    }
}
</script>
<style lang="scss" scoped>
.group-row {
    display: flex;
    background-color: #ecf0f1;
    border-radius: 20px;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    margin-bottom: 1.5rem;
    padding: 1rem;

    .product-summary {
        width: 25%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .product-thumb img {
            object-fit: contain;
            width: 150px;
            height: auto;
            max-height: 180px;
            margin-bottom: 0.5rem;
        }

        .product-title {
            color: $heading;
            font-weight: 700;
            font-size: 1.15rem;
            text-decoration: none;
            line-height: 1;
            text-align: center;
            transition: 0.2s ease-out;

            &:hover {
                color: $dark-pink;
            }
        }
    }

    .health-bar::v-deep {
        .product-health {
            display: flex;
        }

        .product-metrics {
            margin-top: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: 2rem;
        }

        .circular-bar {
            min-width: 200px;
            position: relative;
            top: 1.5rem;
        }
    }

    .product-actions {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .suggestions {
        padding-top: 1rem;
        padding-left: 1rem;
        font-size: 0.9rem;
        letter-spacing: -0.35px;
        line-height: 1.2;

        p {
            border-bottom: 1px solid rgba(0,0,0,0.1);
            padding-bottom: 0.4rem;
            margin-bottom: 0.4rem;
        }
    }
}
</style>