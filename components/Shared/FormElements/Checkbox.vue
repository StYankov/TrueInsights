<template>
  <label class="checkbox-container"
    >{{ label }}
    <input type="checkbox" :checked="checked" :name="name" @change="$emit('change', $event)" />
    <span class="checkmark"></span>
  </label>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      required: false,
    },
    label: {
      type: String,
      required: false,
    },
    checked: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>
<style lang="scss" scoped>
.checkbox-container {
  display: block;
  position: relative;
  padding-left: 30px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  line-height: 1.25;
  user-select: none;
  cursor: pointer;

  &:hover input ~ .checkmark {
    background-color: #ccc;
  }

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  input:checked ~ .checkmark {
    background-color: $dark-pink;
  }

  input:checked ~ .checkmark:after {
    display: block;
  }

  .checkmark {
    position: absolute;
    top: 3px;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: transparent;
    border: 2px solid $dark-pink;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    &:after {
      content: "";
      position: absolute;
      display: none;
      top: 50%;
      left: 50%;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: white;
      transform: translate(-50%, -50%);
    }
  }
}
</style>