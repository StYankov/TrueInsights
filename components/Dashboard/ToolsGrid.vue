<template>
    <div class="tools-grid">
        <Tool
            url="/finder"
            title="The Keyword Finder"
            description="Find the most searched terms"
        />
        <Tool
            url="/reviews-analyzer"
            title="Reviews Analyzer"
            description="Find ouy what your clients think of your products"
            icon="/images/icons/review.png"
        />
    </div>
</template>
<script>
import Tool from '@/components/Dashboard/Tool';

export default {
    components: {
        Tool
    }
}
</script>
<style scoped>
.tools-grid {
    display: flex;
}
</style>