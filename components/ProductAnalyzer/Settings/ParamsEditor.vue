<template>
    <div class="p-group store-params">
        <h5 class="p-group__label">Store Params</h5>
        <div class="p-group__list params-editor">
            <template v-if="store">
                <div class="form-group">
                    <label for="title-length">Title Length</label>
                    <input id="title-length" type="number" name="title_length" @input="updateParam" :value="store.params.title_length">
                </div>

                <div class="form-group">
                    <label for="desc-length">Description Length</label>
                    <input id="desc-length" type="number" name="description_length" @input="updateParam" :value="store.params.description_length">
                </div>

                <div class="form-group">
                    <label for="images-count">Images Count</label>
                    <input id="images-count" type="number" name="images_count" @input="updateParam" :value="store.params.images_count">
                </div>

                <div class="form-group">
                    <label for="reviews-count">Reviews Count</label>
                    <input id="reviews-count" type="number" name="reviews_count" @input="updateParam" :value="store.params.reviews_count">
                </div>

                <div class="form-group">
                    <label for="avg-rating">Average Rating</label>
                    <input id="avg-rating" type="number" name="rating" @input="updateParam" :value="store.params.rating" step="0.1">
                </div>

                <div class="button-wrapper">
                    <Button small center @click="saveParams">Save</Button>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
import Input from '@/components/Shared/FormElements/Input';
import Button from '@/components/Shared/FormElements/Button';

export default {
    components: { Input, Button },
    methods: {
        updateParam(e) {
            const key = e.target.name;
            const value = e.target.value;

            this.$store.commit('stores/settings/UPDATE_CURRENT', { key, value });
        },
        async saveParams() {
            const [success, error] = await this.$store.dispatch('stores/settings/saveParams');

            if(error) {
                this.$swal.toast({ icon: 'error', title: error });
            } else {
                this.$swal.toast({ icon: 'success', title: 'Store prefferences updated' });
            }
        }
    },
    computed: {
        store() {
            return this.$store.state.stores.settings.current;
        }
    }
}
</script>
<style lang="scss" scoped>
    .params-editor {
        padding: 8px 12px;
        display: flex;
        flex-wrap: wrap;

        .form-group {
            display: flex;
            flex-direction: column;
            padding-right: 20px;

            label {
                font-size: 13px;
            }

            input {
                width: 70px;
            }
        }

        .button-wrapper {
            width: 100%;
        }
    }
</style>