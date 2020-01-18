<template>
  <button :class="classes" v-on="events" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'app-button',
  props: {
    type: {
      type: String,
      default: 'primary',
      validator: value => {
        const available = ['primary', 'success', 'danger'];
        const valid = value.match(new RegExp(`(${available.join('|')})`));
        if (!valid) console.warn(`Button.type can only ${available.join(', ')}`);
        return valid;
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes() {
      return {
        ['waves-effect waves-light btn']: true,
        ['light-blue']: this.type === 'primary',
        ['green']: this.type === 'success',
        ['red']: this.type === 'danger'
      }
    },
    events() {
      return {
        ...this.$listeners,
        click: this.onClick
      }
    },
  },
  methods: {
    onClick(event) {
      this.$emit('click', event);
    }
  }
}
</script>
