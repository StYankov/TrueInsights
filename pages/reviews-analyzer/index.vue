<template>
    <div class="container">
      <div class="page-logo">
        <img src="/images/reviews-analyzer.png" alt="reviews-analyzer" />
      </div>
      <div class="page-head">
        <h3 class="section-title">Saved Analysis</h3>
        <Button @click="$router.push('/reviews-analyzer/create')">
            + Analyze Reviews
        </Button>
      </div>
    </div>
</template>
<script>
import Button from '@/components/Shared/FormElements/Button';

export default {
    components: {
        Button
    },
    data() {
        return {
         
        }
    },
    computed: {
    }
}
</script>