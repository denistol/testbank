<template>
  <div class="withdraw-history">
    <div class="withdraw-history__row p-3 mb-1" v-for="(h, hk) in histiryList" :key="hk">
      {{ h.created }} - {{ h.amount | currency }}
    </div>
  </div>
</template>
<script>
import moment from 'moment';

export default {
  name: 'WithdrawHistory',
  props: {
    history: {
      type: Array,
      default: () => ([]),
    },
  },
  computed: {
    histiryList() {
      return [...this.history].reverse().map((el) => ({
        ...el,
        created: moment(el.created).format('HH:mm:ss'),
      }));
    },
  },
};
</script>
<style lang="scss" scoped>
.withdraw-history{
  height: 300px;
  overflow-y: auto;
  &__row{
    background: var(--dark-2);
    border-radius: var(--radius);
  }
}
</style>
