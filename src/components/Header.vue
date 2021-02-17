<template>
  <header class="d-flex justify-content-center align-items-center p-3">
    <a href="#" class="mr-2">
      <img src="@/assets/logo.png" class="d-flex logo" alt="">
    </a>
    <h1>Withdraw</h1>
  </header>
</template>
<script>
export default {
  name: 'Header',
};
</script>
<style lang="scss" scoped>
@keyframes bounce {
  50% {
    transform: translateY(-5px);
  }
}
header{
  .logo{
    animation: bounce 2s ease infinite;
  }
  img{
    width: 3rem;
    object-fit: cover;
  }
}
</style>
