<template>
<div class="container">
  <div class="row">
    <div class="col-12 d-flex my-3 justify-content-center">
      Total: {{totalAmount | currency}}
    </div>
    <div class="col-12 flex-wrap d-flex justify-content-center">
      <NominalCard
      v-for="(n, nk) in nominals"
      :key="nk"
      :nominal="n.value"
      :amount="n.amount" />
    </div>
  </div>
  <div class="row">
    <div class="col-12 my-3 d-flex align-items-end justify-content-center">
      <InputNumber
      ref="amount"
      :max="totalAmount"
      :min="10"
      v-model="amount"
      @enter="onWithdraw"
      title="Withdraw amount" />
      <a href="#" @click.prevent="onWithdraw" class="button ml-3">Withdraw</a>
      <a href="#" @click.prevent="reset" class="button ml-3">Reset</a>
    </div>
    <div class="col-12" v-if="history.length">
      <WithdrawHistory :history="history" />
    </div>
    <div class="col-12" v-else>
      <h5 class="text-center text-secondary">No history</h5>
    </div>
  </div>
</div>
</template>
<script>
import NominalCard from '@/components/NominalCard.vue';
import InputNumber from '@/components/inputs/Number.vue';
import WithdrawHistory from '@/components/WithdrawHistory.vue';

export default {
  name: 'Bank',
  components: {
    NominalCard,
    InputNumber,
    WithdrawHistory,
  },
  data() {
    return {
      nominals: [],
      history: [],
      amount: 10,
    };
  },
  created() {
    this.reset();
  },
  methods: {
    reset() {
      this.nominals = [
        { value: 10, amount: 20 },
        { value: 20, amount: 20 },
        { value: 50, amount: 20 },
        { value: 100, amount: 20 },
        { value: 200, amount: 20 },
        { value: 500, amount: 20 },
      ];
    },
    onSuccess(amount) {
      this.$notify({
        group: 'default',
        type: 'success',
        title: `Withdraw success: ${this.$options.filters.currency(amount)}`,
      });
      this.history.push({ created: new Date(), amount });
    },
    onFail() {
      this.$notify({
        group: 'default',
        title: 'No banknotes',
        type: 'error',
      });
    },
    onWithdraw() {
      let total = 0;
      const buffer = {};

      for (let i = 0; i < this.stack.length; i += 1) {
        const banknote = this.stack[i];
        if (banknote <= (this.amount - total)) {
          // Add banknote
          buffer[banknote] = buffer[banknote] ? buffer[banknote] + 1 : 1;
          total += banknote;
        }
        // On Success
        if (this.amount === total) {
          Object.keys(buffer).forEach((k) => {
            const n = this.nominals.find((el) => el.value === Number(k));
            n.amount -= buffer[k];
          });
          return this.onSuccess(total);
        }
      }
      return this.onFail();
    },
  },
  computed: {
    // All Banknotes with positive amount
    stack() {
      return this.nominals
        .filter((n) => n.amount > 0)
        .map((n) => Array(n.amount).fill(n.value))
        .flat()
        .sort((a, b) => b - a);
    },
    totalAmount() {
      return this.stack.length ? this.stack.reduce((p, c) => p + c) : 0;
    },
  },
};
</script>
