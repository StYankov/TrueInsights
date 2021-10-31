<template>
    <div class="container">
      <div class="page-logo">
        <img src="/images/reviews-analyzer.png" alt="reviews-analyzer" />
      </div>
      <h3 class="section-title">Analysis Name</h3>
      
      <ComparisonTable
        title="Keywords Reviews"
        :labels="getLabels(KeywordReviewsByCount)"
        :rows="KeywordReviewsByCount"
      />

      <ComparisonTable
        title="Reviews By Day of the Week"
        :labels="dayOfWeekLabels"
        :rows="dayOfWeekRows"
      />
    </div>
</template>
<script>
import { KeywordReviewsByCount, ReviewsByDayOfWeek } from '@/data/tables';

import ComparisonTable from '@/components/Tables/ComparisonTable';
import ReviewsPerDayChart from '@/components/ReviewsAnalyzer/ReviewsPerDayChart';

export default {
    components: {
      ComparisonTable,
      ReviewsPerDayChart
    },
    data() {
        return {
          KeywordReviewsByCount,
          ReviewsByDayOfWeek
        }
    },
    methods: {
      getLabels(data) {
        return Object.keys(data[0]);
      }
    },
    computed: {
      dayOfWeekLabels() {
        return ['Day', 1, 2, 3, 4, 5, 'Total'];
      },
      dayOfWeekRows() {
        const rows = [];

        for(const key in this.ReviewsByDayOfWeek) {
          const row = [];
          const reviewsCount = this.ReviewsByDayOfWeek[key];

          for(const dayOfWeek in reviewsCount) {
            row.push(reviewsCount[dayOfWeek]);
          }

          row.push(
            row.reduce((prev, current) => prev +  current)
          );

          row.unshift(key);

          rows.push(row);
        }

        return rows;
      }
    }
}
</script>
<style lang="scss" src="@/assets/styles/pages/reviews-analyzer.scss"></style>