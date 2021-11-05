<template>
    <button 
        class="base-button" 
        :class="{ 
            'base-button--small': small, 
            'base-button--fluid': fluid,
            'base-button--center': center, 
            [buttonClasses]: true
        }"
        :type="type" 
        @click="$emit('click')"
        :disabled="disabled"
    >
        <slot></slot>
    </button>
</template>
<script>
export default {
    props: {
        buttonClasses: {
            type: String,
            required: false,
            default: ''
        },
        type: {
            type: String,
            required: false,
            default: 'button'
        },
        small: {
            type: Boolean,
            required: false,
            default: false
        },
        fluid: {
            type: Boolean,
            required: false,
            default: false
        },
        stroke: {
            type: Boolean,
            required: false,
            default: false
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        },
        center: {
            type: Boolean,
            required: false,
            default: false
        }
    }
}
</script>
<style lang="scss" scoped>
.base-button {
    display: block;
    border: 0;
    border-radius: 25px;
    background: linear-gradient(180deg, rgba(221,103,247,1) 0%, rgba(61,34,214,1) 100%);
    color: #fff;
    padding: 0.8rem 2.5rem;
    font-weight: bold;
    font-size: 1.15rem;
    cursor: pointer;
    min-width: 250px;
    transition: 0.2s background ease-out;

    &:disabled {
        background: #ccc;
    }

    &--small {
        padding: 0.4rem 2.5rem;
        font-size: 0.9rem;
        min-width: 0;
    }

    &--fluid {
        width: 100%;
    }

    &--stroke {
        border: 2px solid #CCCCCC;
        background: transparent;
        color: #222;
    }

    &--center {
        margin: 0 auto;
    }
}
</style>