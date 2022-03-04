<template>
    <div class="horizontal-loader">
        <div :style="{ width: progress + '%' }" class="bar"></div>
    </div>
</template>
<script>
export default {
    props: ['progress'],
    // data() {
    //     return {
    //         progress: 0
    //     }
    // },
    mounted() {
        // setTimeout(this.fill, 1000);
    },
    methods: {
        fill() {
            if(this.progress >= 100)
                return;

            const add = this.randomIntFromInterval(2, 13);

            this.progress = Math.min(100, add + this.progress);

            if(this.progress === 100) {
                this.$emit('ready');
            }

            setTimeout(this.fill, 500);
        },
        randomIntFromInterval(min, max) { // min and max included 
           return Math.floor(Math.random() * (max - min + 1) + min)
        }
    }
}
</script>
<style lang="scss" scoped>
    .horizontal-loader {
        width: 100%;
        border-radius: 25px;
        height: 2.4rem;
        background-color: #ecf0f1;
        overflow: hidden;

        .bar {
            height: 100%;
            background: linear-gradient(90deg, rgba(221,103,247,1) 0%, rgba(61,34,214,1) 100%);
            transition: 0.3s ease-out width;
        }
    }
</style>