<template>
    <div class="heatmaps mb-5">
        <h4>Heatmaps</h4>
        <div class="heatmaps__content">
            <div v-for="(heatmap, origin) in heatmaps" :key="heatmap" class="image-comparison">
                <img :src="origin" />
                <img :src="heatmap" />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['heatmaps']
}
</script>
<style scoped>
.image-comparison {
    display: flex;
    margin-bottom: 2rem;
}

.image-comparison img {
    display: block;
    width: 300px;
    height: 300px;
    margin-right: 0.5rem;
}
</style>