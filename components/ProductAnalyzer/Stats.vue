<template>
    <table class="table">
        <thead>
            <tr>
                <td>Asset</td>
                <td>Retailer Average</td>
                <td>Current Product</td>
                <td>Status</td>
                <td>Action</td>
            </tr>
        </thead>
        <tbody>
            <tr :class="getRowClass(stats.title.status)">
                <td>Title</td>
                <td>{{ stats.title.average }} <span class="unit">characters</span></td>
                <td>{{ stats.title.current }} <span class="unit">characters</span></td>
                <td>{{ getStatus(stats.title.status) }}</td>
                <td>{{ getTitleAction(stats.title.status) }}</td>
            </tr>

            <tr :class="getRowClass(stats.description.status)">
                <td>Description</td>
                <td>{{ stats.description.average }} <span class="unit">characters</span></td>
                <td>{{ stats.description.current }} <span class="unit">characters</span></td>
                <td>{{ getStatus(stats.description.status) }}</td>
                <td>{{ getDescriptionAction(stats.description.status) }}</td>
            </tr>

            <tr :class="getRowClass(stats.images.status)">
                <td>Images</td>
                <td>{{ stats.images.average }}</td>
                <td>{{ stats.images.current }}</td>
                <td>{{ getStatus(stats.images.status) }}</td>
                <td>{{ getImagesAction(stats.images.status, stats.images.current, stats.images.average) }}</td>
            </tr>

            <tr>
                <td>Rating</td>
                <td>{{ stats.rating.average }}</td>
                <td>{{ stats.rating.current }}</td>
                <td></td>
                <td></td>
            </tr>

            <tr>
                <td>Reviews</td>
                <td>{{ stats.reviews.average }}</td>
                <td>{{ stats.reviews.current }}</td>
                <td></td>
                <td></td>
            </tr>

            <tr v-if="stats.image" :class="getRowClass(stats.image.white_background ? 0 : 2)">
                <td>Main Image Has White Background</td>
                <td colspan="2">{{ stats.image.white_background ? 'Yes' : 'No' }}</td>
                <td>{{ stats.image.white_background ? 'Excellent' : 'Needs Improvement' }}</td>
                <td>{{ stats.image.white_background ? 'No action needed' : 'Main image is not on a white background' }}</td>
            </tr>

            <tr v-if="stats.image" :class="getRowClass(imageSizeOk ? 0 : 2)">
                <td>Image Dimensions At least 300x300</td>
                <td colspan="2">{{ imageSizeResponse }}</td>
                <td>{{ imageSizeOk ? 'Excellent' : 'Needs Improvement' }}</td>
                <td>{{ imageSizeOk ? 'No action needed' : 'Upload a higher resolution image ' }}</td>
            </tr>

            <tr v-if="!errors">
                <td>Suggested keywords</td>
                <td colspan="3">
                    <div v-if="missingKeywordsLoading" class="loading-container">
                        <Loader />
                    </div>
                    <span class="keyword" v-else v-for="keyword in missingKeywords" :key="keyword" v-html="keyword"></span>

                    <template v-if="missingKeywords.length === 0 && missingKeywordsLoading === false">
                        No missing keywords
                    </template>
                </td>
                <td>
                    {{ getMissingKeywordsAction() }}
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script>
import Loader from '@/components/Shared/FormElements/Loader';

export default {
    components: { Loader },
    props: ['stats', 'product'],
    data() {
        return {
            missingKeywordsLoading: true,
            errors: false,
            missingKeywords: []
        }
    },
    mounted() {
        this.loadMissingKeywords()
    },
    methods: {
        async loadMissingKeywords() {
            this.missingKeywordsLoading = true;
            try {
                const response = await this.$axios.post('missing-keywords', {
                    url: this.product.category_url,
                    product_id: this.product.id,
                    description: this.product.description
                });

                this.missingKeywords = response.data;
                this.missingKeywordsLoading = false;
            } catch(err) {
                this.errors = true;
            }
        },
        getStatus(value) {
            if(value === 0)
                return 'Excellent';
            if(value === 1)
                return 'Below average';
            if(value === 2)
                return 'Needs Improvements';

            return 'Bad';
        },
        getTitleAction(status) {
            if(status <= 1)
                return 'No action needed';

            return 'Rewrite the title';
        },
        getDescriptionAction(status) {
            if(status <= 1)
                return 'No action needed';

            return 'Re-write the copy';
        },
        getImagesAction(status, current, average) {
            if(status <= 1)
                return 'No action needed';

            if(current < average)
                return 'Add more images';
            else return 'Reduce number of images';
        },
        getMissingKeywordsAction() {
            if(this.missingKeywords.length <= 1)
                return 'No action needed';
            
            return 'Consider adding these keywords to the product\'s description';
        },
        getRowClass(status) {
            switch(status) {
                case 0:
                    return 'row-excellent';
                case 1:
                    return 'row-good';
                case 2:
                    return 'row-warning';
                case 3:
                    return 'row-bad';
                default:
                    return '';
            }
        }
    },
    computed: {
        imageSizeOk() {
            return this.stats.image && this.stats.image.width > 300 && this.stats.image.height > 300;
        },
        imageSizeResponse() {
            if(this.imageSizeOk)
                return 'Pass';
            
            return `Fail - ${this.stats.image.width}x${this.stats.image.height}`;
        }
    }
}
</script>
<style scoped>
.unit {
    font-size: 0.75rem;
    font-weight: 600;
}

.row-excellent {
    color: #16a085;
}

.row-good {
    color: #2c3e50;
}

.row-warning {
    color: #f39c12;
}

.row-bad {
    color: #c0392b;
    font-weight: bold;
}

.loading-container {
    width: 100%;
    text-align: center;
}

.keyword {
    display: inline-block;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    padding: 3px 7px;
    background: rgba(52, 73, 94, 0.7);
    color: #fff;
    border-radius: 8px;
}
</style>