<template>
    <div class="unsupported-store">
        <h5>Store is yet unsupported</h5>
        <p>Would you like to be notified when the store is released in the platform?</p>
        <Button @click="$emit('send')" small>Notify Me</Button>
        <fa class="close" :icon="['fa', 'times']" @click="$emit('close')" />
    </div>    
</template>
<script>
import Button from "@/components/Shared/FormElements/Button";

export default {
    components: { Button }    
}
</script>
<style lang="scss" scoped>
.unsupported-store {
    border: 1px solid $purple;
    border-radius: 20px;
    background-color: rgba($purple, 0.2);
    padding: 20px;
    max-width: 500px;
    width: 100%;
    margin: 0 auto;

    position: relative;

    h5 {
        letter-spacing: -0.5px;
    }

    .close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        cursor: pointer;
    }
}
</style>