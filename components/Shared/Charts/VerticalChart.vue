<template>
  <div class="chart vertical-chart" :class="containerClass">
    <h4 v-if="label">{{ label }}</h4>
    <canvas ref="canvas" height="400"></canvas>
  </div>
</template>
<script>
import { Chart, BarController, LinearScale, BarElement } from 'chart.js';

Chart.register(BarController, LinearScale, BarElement);

export default {
  props: ['label', 'containerClass', 'xLabels', 'yData'],
  data() {
        return {
            chart: null
        }
    },
    mounted() {
        this.chart = new Chart(this.$refs.canvas.getContext('2d'), {
            type: 'bar',
            data: {
              labels: this.xLabels, //['Hello', 'world', 'normally', 'you', 'want', 'more', 'words', 'than', 'this'],
              datasets: [
                {
                  label: 'DS',
                  // size in pixel
                  data: this.yData //[90, 20, 70, 60, 50, 40, 30, 20, 10],
                }
              ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                }
            }
        });
    }
}
</script>
<style scoped>
  canvas {
    max-height: 300px;
    width: 100%;
  }
</style>