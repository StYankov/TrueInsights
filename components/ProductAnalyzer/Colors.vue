<template>
    <div class="thumb-colors mb-5">
        <div class="cursor d-flex justify-content-between align-items-center">
            <h4>Color Details</h4>

            <Button v-if="show" small @click="show = !show">Hide</Button>
            <Button v-else small @click="show = !show">Show</Button>
        </div>
        <transition name="expand">
            <div v-if="show" class="thumb-colors__content pt-3">
                <div class="row">
                    <div class="col-md-3">
                        <div class="image-box">
                        <img :src="product.thumb_url" />
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="palette">
                            <div v-for="color in colorPalette" :key="colorKey(color)" :style="backgroundColor(color)" class="palette-color">
                                <span class="color-text">
                                    {{ rgbToHex(color) }}
                                </span>
                            </div>
                            <div>
                                <h5>Contrast: {{ contrastValue }}</h5>
                            </div>
                        </div>
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
    props: ['product', 'palette', 'contrast'],
    data() {
        return {
            show: false
        }
    },
    methods: {
        colorKey(color) {
            return color[0] + color[1] + color[2];
        },
        backgroundColor(color) {
            return {
                backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`
            }
        },
        componentToHex(c) {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        },
        rgbToHex(color) {
            return "#" + this.componentToHex(color[0]) + this.componentToHex(color[1]) + this.componentToHex(color[2]);
        }
    },
    computed: {
        colorPalette() {
            return this.palette.slice(0, 4);
        },
        contrastValue() {
            if(this.contrast < 30)
                return 'Low Image Contrast';

            if(this.contrast < 40)
                return 'Good';

            return 'Excellent';
        }
    }
}
</script>
<style scoped>
.palette {
    display: flex;
    flex-direction: column;
}

.palette-color {
    position: relative;
    width: 100%;
    max-width: 160px;
    height: 35px;
    margin-bottom: 28px;
}

.palette-color .color-text {
    position: absolute;
    top: 99%;
    right: 0;
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