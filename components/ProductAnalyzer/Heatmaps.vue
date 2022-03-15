<template>
    <div class="heatmaps mb-5">
        <div @click="show = !show" class="cursor d-flex justify-content-between align-items-center">
            <h4>Heatmaps</h4>
            <fa v-if="show" :icon="['fa', 'chevron-down']" />
            <fa v-else :icon="['fa', 'plus']" />
        </div>
        
        <transition name="expand">
            <div v-if="show" class="heatmaps__content">
                <div v-for="(heatmap, origin) in heatmaps" :key="heatmap" class="image-comparison">
                    <div class="image-box">
                        <img :src="origin" />
                        <p class="image-label">Original</p>
                    </div>
                    <div class="image-box">
                        <img :src="heatmap" />
                        <p class="image-label">Heatmap</p>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
    props: ['heatmaps'],
    data() {
        return {
            show: false
        }
    }
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

.image-box {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.image-box .image-label {
    font-size: 12px;
    margin-top: 8px;
    margin-bottom: 0;
}

.cursor {
    cursor: pointer;
}

.expand-enter-active,
.expand-leave-active {
  transition: max-height .5s ease;
  max-height: 400px;
}

.expand-enter,
.expand-leave-to {
  max-height: 0;
  overflow: hidden;
}
</style>