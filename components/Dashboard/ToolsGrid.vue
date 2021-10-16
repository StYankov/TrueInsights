<template>
    <div class="tools-grid">
        <Tool
            title="The Keyword Finder"
            description="Find the most searched terms"
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