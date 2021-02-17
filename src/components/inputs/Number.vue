<template>
<div class="input-number">
  <div class="input-number__title mb-1"
    :class="{active: focused}" v-if="title || invalid">
    <small>
    {{ invalid || title }}
    </small>
  </div>
  <div class="input-number__field">
    <input
    :class="{active: focused, invalid}"
    :max="max"
    :min="min"
    type="number"
    class="px-3 py-2"
    @blur="onBlur"
    @focus="onFocus"
    @keypress="onKeyPress"
    @keypress.enter="onEnter"
    v-model="val">
  </div>
</div>
</template>
<script>
export default {
  name: 'InputNumber',
  props: {
    title: {
      type: String,
      required: false,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
  },
  data() {
    return {
      touched: false,
      focused: false,
    };
  },
  computed: {
    invalid() {
      if (!this.touched) {
        return false;
      }
      const value = parseInt(this.val, 10);
      if (value < this.min) {
        return `Min amount: ${this.min}`;
      }
      if (value > this.max) {
        return `Max amount: ${this.max}`;
      }
      if (value % 10 !== 0) {
        return 'Amount must be multiple of 10';
      }
      return false;
    },
    val: {
      get() {
        return Number(this.$attrs.value) || 0;
      },
      set(val) {
        this.$emit('input', Number(val));
      },
    },
  },
  methods: {
    onEnter() {
      this.$emit('enter');
    },
    onKeyPress() {
      this.touched = true;
    },
    onFocus() {
      this.focused = true;
    },
    onBlur() {
      this.focused = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.input-number{
  &__title{
    transition: all .23s ease;
    transform: translateY(0);
    opacity: .3;
    pointer-events: none;
    &.active{
      opacity: 1;
      transform: translateY(-0.3rem);
    }
  }
  &__field{
    input{
      text-align: center;
      box-shadow: none;
      outline: none;
      border: none;
      background: var(--dark-2);
      border-radius: var(--radius);
      border: 1px solid var(--dark-2);
      transition: all .23s ease;
      &.active{
        border-color: var(--accent);
        box-shadow: 0px 0px 8px var(--accent-darker);
      }
      &.invalid{
        border-color: var(--error);
        box-shadow: 0px 0px 8px var(--error-darker);
      }
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    input[type=number] {
      -moz-appearance: textfield;
    }
  }
}
</style>
