<template>
    <i
      :class="classes"
      @click="clickHandler"
    />
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  computed: {
    classes() {
      return {
        ['menu-toggle fa']: true,
        ['fa-bars']: !this.open,
        ['fa-times open']: this.open
      }
    }
  },
  methods: {
    clickHandler() {
      this.$emit('open')
    }
  }
}
</script>

<style lang="scss">
.menu-toggle {
  display: none;
  position: fixed;
  top: 20px;
  left: 20px;
  font-size: 20px;
  cursor: pointer;
  color: white;
  transition: opacity, left .22s ease-in;
  z-index: 100;

  &:hover {
      opacity: .7;
  }

  &.open {
      left: 320px;
  }
}

@media screen and (max-width: 992px) {
  .menu-toggle {
    display: block;
  }
}

</style>
