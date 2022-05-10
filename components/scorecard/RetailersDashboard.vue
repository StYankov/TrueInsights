<template>
    <div class="scorecard-retailers-table">
        <h3>{{ scorecard.brand }}</h3>
        <div class="table-responsive">
            <table class="table table-bordered scorecard-table">
                <thead>
                    <tr>
                        <th v-for="label in headers" v-html="label" :key="label"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, index) in rows" :key="'row-' + index">
                        <td 
                            :class="{
                                'status-good': column.value >= 85,
                                'status-ok': column.value >= 50 && column.value < 85,
                                'status-bad': column.value < 50
                            }"
                            v-for="(column, colIndex) in row" 
                            :key="`${index}-${colIndex}`"
                            v-html="column.value + (column.suffix || '')"></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="brand-charts">
            <template v-if="stores.length > 1">
                <RetailerChart :column="rows[0]" :xLabels="stores" legend="Title Length Score" />
                <RetailerChart :column="rows[1]" :xLabels="stores" legend="Description Length Score" />
                <RetailerChart :column="rows[2]" :xLabels="stores" legend="Images Length Score" />
            </template>
        </div>
    </div>
</template>
<script>
import RetailerChart from '@/components/scorecard/RetailerChart';

export default {
    components: {
        RetailerChart
    },
    props: {
        scorecard: {
            type: Object,
            required: true
        }
    },
    computed: {
        stores() {
            return this.scorecard.details.map(x => x.store);
        },
        headers() {
            return ['Retailer Dashboard', ...this.stores];
        },
        rows() {
            const titleHeader = 'Product Title Length';
            const descHeader  = 'Description Length';
            const imageHeader = 'Image Count';
            const ratingHeader = 'Rating';
            const reviewsHeader = 'Reviews';
            const mobileImageHeader = 'Mobile Friendly Hero Image';

            const title_row = [{ value: titleHeader }];
            for(let i = 0; i < this.stores.length; i++) {
                title_row.push({
                    value: this.scorecard.details[i].data.title_above_average,
                    suffix: '%'
                });
            }

            const desc_row = [{ value: descHeader }];
            for(let i = 0; i < this.stores.length; i++) {
                desc_row.push({
                    value: this.scorecard.details[i].data.desc_above_average,
                    suffix: '%'
                });
            }

            const images_row = [{ value: imageHeader }];
            for(let i = 0; i < this.stores.length; i++) {
                images_row.push({
                    value: this.scorecard.details[i].data.images_above_average,
                    suffix: '%'
                });
            }

            const reviews_row = [{ value: reviewsHeader }];
            for(let i = 0; i < this.stores.length; i++) {
                reviews_row.push({
                    value: this.scorecard.details[i].data.reviews_above_average || 0,
                    suffix: '%'
                });
            }

            const rating_row = [{ value: ratingHeader }];
            for(let i = 0; i < this.stores.length; i++) {
                rating_row.push({
                    value: this.scorecard.details[i].data.rating_above_average || 0,
                    suffix: '%'
                });
            }

            const mobile_image_hero_row = [{ value: mobileImageHeader }];
            for(let i = 0; i < this.stores.length; i++) {
                mobile_image_hero_row.push({
                    value: this.scorecard.details[i].data.mobile_hero_image_score || 0,
                    suffix: '%'
                });
            }

            const rows = [
                title_row,
                desc_row,
                images_row
            ];

            rows.push(rating_row);
            rows.push(reviews_row);
            rows.unshift(mobile_image_hero_row);

            return rows;
        }
    }
}
</script>
<style scoped>
.brand-charts {
    display: flex;
    flex-direction: row;
    width: 100%;
    overflow: auto;
}

.status-good {
    background: #75fb4c;
}

.status-ok {
    background-color: #ffff55;
}

.status-bad {
    background-color: #d85040;
}

</style>