<template>
<div class="container-fluid">
  <notifications position="bottom center" group="default" />
  <div class="row">
    <div class="col-12">
      <Header />
    </div>
    <div class="col-12">
      <slot/>
    </div>
  </div>
</div>
</template>
<script>
import Header from '@/components/Header.vue';

export default {
  name: 'DefaultLayout',
  components: {
    Header,
  },
};
</script>
