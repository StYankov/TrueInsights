<template>
<div class="modal-outline">
  <div class="modal modal--open" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Column Selector</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="$emit('close')"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <Select
                :value="value"
                @change="onSelect"
                placeholder="Select Column"
                :options="options"
            />

            <p v-if="error" class="text-muted mb-1">Please select a column for import</p>
        </div>
        <div class="modal-footer">
          <Button medium @click="submitValue">Extract</Button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import Button from '@/components/Shared/FormElements/Button';
import Select from '@/components/Shared/FormElements/Select';

export default {
    components: {
        Button,
        Select
    },
    props: [
        'options'
    ],
    data() {
        return {
            value: '',
            error: false
        }
    },
    methods: {
        onSelect(val) {
            this.value = val;
        },
        submitValue() {
            if(this.value !== '')
                this.$emit('selected', this.value);
            else this.error = true;
        }
    }
};
</script>
<style scoped>
    .modal-outline {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,0.2);
    }

    .modal-header {
        justify-content: center;
    }

    .modal-header .close {
        position: absolute;
        right: 5px;
        top: 5px;
        margin: 0;
        border: 0;
        background-color: transparent;
        font-size: 2rem;
        line-height: 1;
        width: 40px;
        height: 40px;
        padding: 0;
    }

    .modal-header .close:hover {
        color: #3d22d6;
    }

    .modal-footer {
        justify-content: center;
        border-top: 0;
        padding-top: 0;
    }

    .modal--open {
        display: block;
    }
</style>