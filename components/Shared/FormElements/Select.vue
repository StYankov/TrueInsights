<template>
    <div class="base-input" :class="containerClass">
        <label :for="name">{{ placeholder }}</label> 
        <VueSelect 
            :multiple="multiple" 
            :id="name" 
            :name="name" 
            :class="inputClass" 
            :value="value"
            :placeholder="defaultValue"
            :options="options"
            @input="$emit('change', $event)">
              <template v-slot:option="option">
                <span v-if="option.country" class="option-country"><img :src="`/images/flags/${option.country.toLowerCase()}.png`" /></span>
                {{ option.label }}
            </template>
        </VueSelect>
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
        defaultValue: {
            type: String,
            required: false
        },
        options: {
            type: Array,
            required: false,
            default: () => []
        },
        multiple: {
            type: Boolean,
            required: false,
            default: false
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

    .option-country img {
        display: inline-block;
        width: 28px;
        margin-right: 8px;
    }
}
</style>