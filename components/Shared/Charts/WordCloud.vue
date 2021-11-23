<template>
  <div class="chart word-cloud" :class="containerClass">
    <h4 v-if="label">{{ label }}</h4>
    <canvas ref="canvas" height="400"></canvas>
  </div>
</template>
<script>
import { Chart } from 'chart.js';
import { WordCloudController, WordElement } from 'chartjs-chart-wordcloud';

Chart.register(WordCloudController, WordElement);

export default {
  props: ['label', 'containerClass', 'keywords'],
    data() {
        return {
            chart: null
        }
    },
    mounted() {
        this.chart = new Chart(this.$refs.canvas.getContext('2d'), {
            type: WordCloudController.id,
            data: {
              labels: this.kLabels,
              datasets: [
                {
                  label: 'DS',
                  data: this.kScores
                }
              ]
            }
        });
    },
    methods: {
      normalize(val, max=50, min=1) { return (val - min) / (max - min); }
    },
    computed: {
      kLabels() {
        if(!this.keywords)
          return ['Hello', 'world', 'normally', 'you', 'want', 'more', 'words', 'than', 'this'];

        return Object.keys(this.keywords).slice(0, 100);
      },
      kScores() {
        if(!this.keywords)
          return [90, 20, 70, 60, 50, 40, 30, 20, 10];

        return Object.keys(this.keywords).map(x => this.normalize(this.keywords[x].count)).slice(0, 100);
      }
    }
}
</script>
<style scoped>
  canvas {
    max-height: 300px;
    width: 100%;
  }
</style>