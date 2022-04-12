<template>
    <div class="scorecard-retailers-table">
        <h3>{{ scorecard.brand }}</h3>
        <table class="table table-bordered scorecard-table">
            <thead>
                <tr>
                    <th v-for="label in headers" v-html="label" :key="label"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in rows" :key="'row-' + index">
                    <td 
                        v-for="(column, colIndex) in row" 
                        :key="`${index}-${colIndex}`"
                        v-html="column.value + (column.suffix || '')"></td>
                </tr>
            </tbody>
        </table>
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
            const titleHeader = 'Product Title Length <span class="info">- Products with higher than retailer average length</span>';
            const descHeader  = 'Description Length <span class="info">- Products with higher than retailer average length</span>';
            const imageHeader = 'Image Count <span class="info">- Products with > images vs. the retailer average for 2nd images</span>';

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

            return [
                title_row,
                desc_row,
                images_row
            ];
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
</style>