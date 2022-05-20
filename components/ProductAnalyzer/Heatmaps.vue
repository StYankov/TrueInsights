<template>
    <div class="heatmaps mb-5">
        <div class="cursor d-flex justify-content-between align-items-center">
            <h4>Thumbnail Details</h4>

            <Button v-if="show" small @click="show = !show">Hide</Button>
            <Button v-else small @click="show = !show">Show</Button>
        </div>
        
        <transition name="expand">
            <div v-if="show" class="heatmaps__content pt-3">
                <div class="row">
                    <div v-if="heatmap" class="col-md-3">
                        <div class="image-box">
                            <img :src="heatmap.original" />
                            <p class="image-label">Original</p>
                        </div>
                    </div>

                    <div v-if="heatmap" class="col-md-3">
                        <div class="image-box">
                            <img :src="heatmap.heatmap" />
                            <p class="image-label">Heatmap</p>
                        </div>
                    </div>

                    <div class="col-md-3" v-if="blur">
                        <div class="image-box">
                            <img :src="blur.image" />
                        </div>
                    </div>
                    <div class="col-md-3" v-if="blur">
                        <p class="pass" v-if="blur.logo_detected"><fa :icon="['fas', 'check']" /> Logo detected</p>
                        <p class="fail" v-else><fa :icon="['fas', 'check']" /> Logo not detected on image.</p>

                        <p class="pass" v-if="blur.size_detected"><fa :icon="['fas', 'check']" /> Product size detected</p>
                        <p class="fail" v-else><fa :icon="['fas', 'check']" /> Product size not detected.</p>

                        <p class="fail" v-if="blur.size_too_small"><fa :icon="['fas', 'check']" />Product size too small font size</p>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import Button from '@/components/Shared/FormElements/Button';

export default {
    components: { Button },
    props: ['heatmaps', 'blur'],
    data() {
        return {
            show: false
        }
    },
    computed: {
        heatmap() {
            return this.heatmaps ? this.heatmaps[0] : null;
        }
    }
}
</script>
<style scoped>
.heatmaps__content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
}
.image-comparison {
    display: flex;
    margin-bottom: 2rem;
}

.image-comparison img {
    display: block;
    width: 280px;
    height: 285px;
    margin-right: 0.25rem;
}

@media (min-width: 1400px) {
    .image-comparison img {
        width: 288px;
        height: 300px;
        margin-right: 0.5rem;
    }
}

.image-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    justify-content: center;
}

.image-box img {
    width: 100%;
    height: auto;
    max-height: 420px;
    object-fit: contain;
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

.pass {
    color: #27ae60
}

.fail {
    color: #c0392b;
}
</style>