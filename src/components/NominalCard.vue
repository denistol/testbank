<template>
<div class="nominal-card m-1 p-3 d-flex flex-wrap align-items-center"
  :class="{empty: amount === 0}">
    <div :class="{active: up}" class="arrow p-3 text-success">▲</div>
    <div :class="{active: down}" class="arrow p-3 text-danger">▼</div>
    <h1 class="mr-2 d-flex">
      {{ nominal | currency }}
    </h1>
    <span class="text-secondary">X{{amount}}</span>
</div>
</template>
<script>
export default {
  name: 'NominalCard',
  data() {
    return {
      up: false,
      down: false,
      timeOut: null,
    };
  },
  props: {
    nominal: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    amount(newVal, oldVal) {
      this.up = false;
      this.down = false;
      clearTimeout(this.timeOut);
      if (newVal > oldVal) {
        this.up = true;
      } else {
        this.down = true;
      }
      this.timeOut = setTimeout(() => {
        this.up = false;
        this.down = false;
      }, 3000);
    },
  },
};
</script>
<style lang="scss" scoped>
.nominal-card{
  position: relative;
  transition: all .23s ease;
  width: calc(100% / 3.5);
  border-radius: var(--radius);
  background-color: var(--dark-2);
  cursor: pointer;
  .arrow{
    transition: all .5s ease;
    position: absolute;
    right: 0;
    top: 0;
      opacity: 0;
      transform: translateY(0);
    &.active{
      opacity: 1;
      transform: translateY(-4px);
    }
  }
  &:hover{
    transform: translateY(-2px);
    box-shadow: 0px 0px 20px rgba(0,0,0, .5);
    h1{
      transition: all .23s ease;
      color: var(--accent);
    }
  }
  &.empty{
    opacity: .3;
    *{
      color: var(--error);
    }
  }
}
</style>
