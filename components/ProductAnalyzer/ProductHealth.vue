<template>
  <div class="product-health">
    <div class="circular-bar">
      <client-only>
        <vue-ellipse-progress
          :progress="stats.total" 
          :emptyThickness="8"
          :color="barColor"
          :legend-formatter="legendFormatter"
          :dot="{ size: 20, backgroundColor: '#fff', border: '4px solid ' + barColor }"
          half
        >
          <template v-slot:legend-caption>
            <p class="legend-caption">{{ barCaption }}</p>
          </template>
        </vue-ellipse-progress>
      </client-only>
      <slot name="below-circle"></slot>
    </div>
    <div class="product-metrics">
      <Meter title="Ttile" :score="stats.title.score" />
      <Meter title="Description" :score="stats.description.score" />
      <Meter title="Images" :score="stats.images.score" />
      <Meter v-if="stats.reviews && stats.rating" :title="`Reviews & Ratings`" :score="(stats.reviews.score + stats.rating.score) / 2" />
    </div>
  </div>
</template>
<script>
import Meter from '@/components/ProductAnalyzer/Meter';

export default {
  components: { Meter },
  props: {
    stats: {
      type: Object,
      required: true
    },
    score: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    legendFormatter({ currentValue }) {
      return `${currentValue}<span class="percent">%</span>`;
    }
  },
  computed: {
    barColor() {
      if(this.stats.total >= 90)
        return '#16a085';

      if(this.stats.total >= 75)
        return '#88b554';

      if(this.stats.total >= 60)
        return '#f9ca24';
      
      if(this.stats.total >= 35)
        return '#f39c12'; 

      return '#c0392b';
    },
    barCaption() {
      if(this.stats.total >= 98)
        return 'Excellent';

      if(this.stats.total >= 90)
        return 'Very Good';

      if(this.stats.total >= 75)
        return 'Good';

      if(this.stats.total >= 50)
        return 'Fair';

      if(this.stats.total >= 35)
        return 'Bad';
      
      return 'Very Bad';
    }
  }
};
</script>
<style lang="scss">
.product-health {
  .circular-bar {
    min-height: 200px;
  }
  
  .ep-container {
    margin-left: 1rem;
  }

  .ep-content {
    transform: rotateZ(90deg);
  }

  .ep-legend--container {
    position: relative !important;
    left: -35px;
    transform: rotateZ(-90deg);
  }

  .ep-legend--value {
    font-size: 2rem;
    font-weight: 600;
    line-height: 30px;
    color: #666;

    .percent {
      font-size: 1.25rem;
      font-weight: 200;
    }
  }

  .legend-caption {
    font-size: 14px;
    line-height: 16px;
    margin-bottom: 0;
    opacity: 0.8;
  }
}

.product-metrics {
  margin-top: -85px;
}
</style>