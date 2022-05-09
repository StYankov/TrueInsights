<template>
  <div style="width: 240px">
    <canvas ref="canvas" style="width: 240px; height: 200px"></canvas>
  </div>
</template>
<script>
import {
  Chart,
  BarController,
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
} from "chart.js";

Chart.register(BarController, CategoryScale, LinearScale, BarElement, Legend);

export default {
  props: {
    column: {
      type: Array,
      required: true,
    },
    xLabels: {
      type: Array,
    },
    legend: {
      type: String,
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      this.chart = new Chart(this.$refs.canvas, {
        type: "bar",
        data: {
          labels: this.xLabels,
          datasets: [
            {
              label: this.legend,
              data: this.yLabels,
              backgroundColor: this.barColors,
              borderWidth: 0,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              min: 0,
            },
          },
          legend: {
            display: true,
            labels: {
              fontColor: "#222",
              fontSize: 15,
              boxWidth: 0,
              boxSize: 0,
            },
          },
          maintainAspectRatio: true,
          responsive: true,
          indexAxis: "x",
          plugins: {
            legend: {
              labels: {
                boxWidth: 0
              }
            }
          }
        },
      });
    },
  },
  computed: {
    yLabels() {
      return this.column.slice(1).map((x) => x.value);
    },
    barColors() {
      const colors = [];
      for (const value of this.yLabels) {
        if (value >= 85) {
          colors.push("#75fb4c");
        } else if (value >= 50) {
          colors.push("#ffff55");
        } else {
          colors.push("#d85040");
        }
      }

      return colors;
    },
  },
  watch: {
    xLabels: function () {
      this.chart.destroy();

      this.renderChart();
    },
  },
};
</script>