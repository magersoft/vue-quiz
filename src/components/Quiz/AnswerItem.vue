<template>
  <li :class="classes" @click="$emit('click', answer.id)">{{ answer.text }}</li>
</template>

<script>
export default {
  props: {
    answer: Object,
    state: String
  },
  computed: {
    classes() {
      return {
        ['answer-item']: true,
        ['success']: this.state === 'success',
        ['error']: this.state === 'error'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.answer-item {
  border: 1px solid white;
  border-radius: 5px;
  padding: 5px 10px;
  margin-bottom: 5px;
  cursor: pointer;

  &.success {
    background: rgba(161, 240, 69, .7);
  }

  &.error {
    background: rgba(240, 87, 108, .7);
  }

  &:not(.success):not(.error):hover {
    background: rgba(255, 255, 255, .2);
    transition: background .3s ease-in-out;
  }
}
</style>
