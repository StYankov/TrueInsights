<template>
    <div class="p-group">
        <h5 class="p-group__label">Stores</h5>
        <div class="p-group__list">
            <div 
                v-for="item in list" 
                :key="item.id" 
                class="p-group__item" 
                @click="$emit('click', item)"
                :class="{
                    selected: currentId == item.id
                }"
            >
                {{ item.name }} {{ item.country.slug.toUpperCase() }}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        list: {
            type: Array,
            required: true
        },
        currentId: {
            type: Number,
            required: false
        }
    },
    mounted() {
        console.log(this.currentId);
    }
}
</script>