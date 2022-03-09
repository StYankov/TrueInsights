<template>
    <div class="supported-stores">
        <h4>Supported Stores</h4>
        <div class="row mt-5">
            <div v-for="store in stores" :key="store" class="col-md-3 mb-5">
                <img class="store-logo" :src="`/images/stores/${store}`" :alt="store.split('.')[0]" />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    computed: {
        stores() {
            return [
                'amazoncouk.png',
                'argos.png',
                'asda.png',
                'auchan.png',
                'morrisons.svg',
                'ozonru.png',
                'rewe.webp',
                'tesco.png',
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
.supported-stores {
    width: 100%;
    .store-logo {
        display: block;
        margin: 0 auto;
        width: 100%;
        max-width: 250px;
        height: 62px;
    }
}
</style>