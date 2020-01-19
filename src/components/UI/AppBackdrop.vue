<template>
  <div class="app-backdrop" @click="$emit('click')"></div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.app-backdrop {
  z-index: 50;
  background: rgba(0,0,0,.7);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  cursor: pointer;
}
</style>
