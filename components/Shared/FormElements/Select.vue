<template>
    <div class="base-input" :class="containerClass">
        <label :for="name">{{ placeholder }}</label> 
        <VueSelect :id="name" :name="name" :class="inputClass" @change="$emit('change')" :value="value" :options="options" />
        <p v-if="desc" class="base-input__desc">
            {{ desc }}
        </p>
    </div>
</template>
<script>
import { VueSelect } from 'vue-select';
import 'vue-select/dist/vue-select.css';

export default {
    components: { VueSelect },
    props: {
        containerClass: {
            type: String,
            required: false
        },
        inputClass: {
            type: String,
            required: false
        },
        name: {
            type: String,
            required: false
        },
        value: {
            type: String,
            required: false
        },
        desc: {
            type: String,
            required: false
        },
        placeholder: {
            type: String,
            required: false
        },
        options: {
            type: Array,
            required: false,
            default: () => []
        }
    }
}
</script>
<style lang="scss" scoped>
.base-input {
    width: 100%;

    label {
        display: block;
        font-weight: 600;
    }

    select {
        border-radius: 2px;
        margin-bottom: 0.5rem;
        color: $heading;
        font-size: 1.25rem;
        padding: 0.2rem;
        border: 1px solid $dark;
        min-width: 150px;
    }

    &__desc {
        font-size: 0.75rem;
        font-weight: bold;
        line-height: 1.15;
        text-align: right;
        color: #4b21d8;
    }
}
</style>