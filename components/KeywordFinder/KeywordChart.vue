<template>
    <div class="keyword-chart">
        <h5>Origin Keyword: {{ keyword }}</h5>
        <div>
            <canvas ref="canvas" :style="`width: 100%; height: ${canvasHeight}px`" width="100%"></canvas>
        </div>
    </div>
</template>
<script>
import { Chart, BarController, CategoryScale, LinearScale, BarElement } from 'chart.js';

Chart.register(BarController, CategoryScale, LinearScale, BarElement);

export default {
    props: ['keywordList', 'keyword'],
    data() {
        return {
            chart: null
        }
    },
    mounted() {
        this.chart = new Chart(this.$refs.canvas, {
            type: 'bar',
            data: {
                labels: this.yLabels,
                datasets: [{
                    data: this.xLabels,
                    backgroundColor: '#D35EF4',
                    borderWidth: 0,
                    barPercentage: this.barWidth
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                legend: {
                    display: false,
                    labels: {
                        fontColor: '#222',
                        fontSize: 15
                    }
                },
                maintainAspectRatio: false,
                indexAxis: 'y',
                tooltips: {
                    intersect: false
                },
                interaction: {
                    mode: 'index'
                }
            }
        });
    },
    computed: {
        xLabels() {
            return this.keywordList.map(x => x.percent);
        },
        yLabels() {
            return this.keywordList.map(x => x.word);
        },
        barWidth() {
            return 1;
        },
        canvasHeight() {
            return this.yLabels.length * 27;
        }
    }
}
</script>
<style lang="scss" scoped>
    .keyword-chart {
        border-radius: 1rem;
        background-color: #F3F3F3;
        padding: 1rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
</style>