<template>
    <div class="tools-grid">
        <Tool
            url="/finder"
            title="The Keyword Finder"
            description="Find the most searched terms"
        />
        <Tool
            url="/analytics"
            title="Marketplace Analytics"
            description="Full analysis of all key metrics for an online retailer"
            icon="/images/chart.svg"
        />
        <Tool
            url="/product-analyzer"
            title="Product Analyzer"
            description="Analyze key performance indicators for a product"
            icon="/images/signal.svg"
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
    flex-direction: column;
    flex-wrap: wrap;
}

@media (min-width: 991px) {
    .tools-grid {
        flex-direction: row;
    }
}
</style>