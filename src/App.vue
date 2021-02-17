<template>
  <component :is="layout">
    <Bank />
  </component>
</template>
<script>

import DefaultLayout from '@/layouts/Default.vue';
import Bank from '@/components/Bank.vue';

export default {
  name: 'App',
  components: {
    Bank,
    DefaultLayout,
  },
  data() {
    return {};
  },
  computed: {
    layout() {
      return 'DefaultLayout';
    },
  },
};
</script>
