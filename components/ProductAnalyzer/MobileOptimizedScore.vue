<template>
    <div class="hero-image-score">
        <h4 class="mb-3">Hero Image Score</h4>
        <div class="row">
            <div class="col-md-3">
                <img class="benchmarked-image" :src="imageData.image" />
            </div>
            <div class="col-md-3">
                <div class="mobile-progrss d-flex align-items-center justify-content-center flex-column">
                    <client-only>
                        <vue-ellipse-progress
                            :progress="imageData.score" 
                            :emptyThickness="8"
                            :color="barColor"
                            :legend-formatter="legendFormatter"
                            :dot="{ size: 20, backgroundColor: '#fff', border: '4px solid ' + barColor }"
                        >
                        </vue-ellipse-progress>
                    </client-only>
                    <p class="text-center">{{ imageData.status }}</p>
                </div>
            </div>
            <div class="col-md-3">
                <p class="data-row">
                    <strong>Tiny Texts:</strong>
                    {{ imageData['Tiny Texts'] }}
                </p>
                <p class="data-row">
                    <strong>Small Texts:</strong>
                    {{ imageData['Small Texts'] }}
                </p>
                <p class="data-row">
                    <strong>Medium Texts:</strong>
                    {{ imageData['Medium Texts'] }}
                </p>
                <p class="data-row">
                    <strong>Big Texts:</strong>
                    {{ imageData['Big Texts'] }}
                </p>
                <p class="data-row">
                    <strong>Big Texts:</strong>
                    {{ imageData['Big Texts'] }}
                </p>
                <p class="data-row">
                    <strong>Horizontal Whitespace in %:</strong>
                    {{ imageData['Horizontal Whitespace'] }}%
                </p>
                <p class="data-row">
                    <strong>Vertical Whitespace in %:</strong>
                    {{ imageData['Vertical Whitespace'] }}%
                </p>
                <p class="data-row">
                    <strong>Average Symbol Size in px:</strong>
                    {{ imageData['Average Character Size In Pixels'] }}%
                </p>
                <p class="data-row">
                    <strong>Relative Symbol Size:</strong>
                    {{ imageData['Average Char Size / Image Width'] }}%
                </p>
                <p class="data-row">
                    <strong>Packaged Goods Objects:</strong>
                    {{ imageData['total_objects'].length }}
                </p>
            </div>
            <div class="col-md-3">
                <template v-if="imageData.critical.length">
                    <h5>Critical Problems</h5>
                    <p class="log-row" v-for="row in imageData.critical" :key="row">{{ row }}</p>
                </template>

                <template v-if="imageData.logs.length">
                    <h5>Logs</h5>
                    <p class="log-row" v-for="row in imageData.logs" :key="row">{{ row }}</p>
                </template>
            </div>
        </div>
    </div>    
</template>
<script>
export default {
    props: {
        imageData: {
            type: Object
        }
    },
    methods: {
        legendFormatter({ currentValue }) {
            return `${currentValue}<span class="percent">%</span>`;
        }
    },
    computed: {
        barColor() {
            if(this.imageData.score >= 90)
                return '#16a085';

            if(this.imageData.score >= 75)
                return '#88b554';

            if(this.imageData.score >= 60)
                return '#f9ca24';
            
            if(this.imageData.score >= 35)
                return '#f39c12'; 

            return '#c0392b';
        },
    }
}
</script>
<style lang="scss" scoped>
    .benchmarked-image {
        max-width: 100%;
        height: 100%;
        max-height: 400px;
    }

    .data-row {
        margin-bottom: 0;
    }

    .log-row {
        font-size: 14px;
        margin-bottom: 0.5rem;
    }
</style>