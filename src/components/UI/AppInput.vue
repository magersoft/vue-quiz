<template>
  <div class="input-field">
    <input
      :id="generateId"
      :type="type"
      class="validate"
      :value="value"
      v-on="events"
      :required="required"
      @input="$emit('input', $event.target.value)"
    />
    <label v-if="label" :for="generateId">{{ label }}</label>
    <span v-if="touched && !valid && errorMessage" class="error-message">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    type: {
      type: String,
      default: 'text',
      validator: value => {
        const available = ['text', 'email', 'password'];
        const valid = value.match(new RegExp(`(${available.join('|')})`));
        if (!valid) console.warn(`AppInput.type can only ${available.join(', ')}`);
        return valid;
      }
    },
    required: {
      type: Boolean,
      default: false
    },
    value: String,
    errorMessage: String,
    valid: {
      type: Boolean,
      default: true
    },
    touched: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    generateId() {
      return `${this.type}-${Math.random()}`
    },
    events() {
      return {
        input: this.onInput,
        change: this.onChange
      }
    }
  },
  methods: {
    onInput(event) {
      this.$emit('input', event.target.value)
    },
    onChange(event) {
      this.$emit('change', event)
    }
  }
}
</script>

<style lang="scss">
.error-message {
  color: red;
  font-size: 0.8rem;
}
</style>
