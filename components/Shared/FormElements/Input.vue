<template>
    <div class="base-input" :class="containerClass">
        <label v-if="label">{{ label }}</label>
        <input 
            ref="input"
            :type="type" 
            :value="value" 
            :name="name" 
            :placeholder="placeholder"
            :class="inputClass" 
            @input="$emit('input', $event)"
            @keyup.enter="$emit('enter', $event)"
            @blur="$emit('blur', $event)"
        >
        <div class="below-input">
            <slot name="below-input"></slot>
            <p v-if="desc" class="base-input__desc">
                {{ desc }}
            </p>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        containerClass: {
            type: String,
            required: false
        },
        inputClass: {
            type: String,
            required: false
        },
        type: {
            type: String,
            required: false,
            default: 'text'
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
        label: {
            type: String,
            required: false
        }
    }
}
</script>
<style lang="scss" scoped>
.base-input {
    width: 100%;

    input {
        width: 100%;
        border-radius: 2px;
        border: 1px solid $dark;
        padding: 0.2rem;
        color: $heading;
        font-size: 1.25rem;
        margin-bottom: 0.5rem;
    }

    .below-input {
        display: flex;
        justify-content: space-between;
    }

    &__desc {
        font-size: 0.75rem;
        font-weight: bold;
        line-height: 1.15;
        text-align: right;
        color: #4b21d8;
        width: 100%;
    }
}
</style>