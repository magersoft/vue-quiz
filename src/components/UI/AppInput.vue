<template>
  <div class="input-field">
    <input
      :id="generateId"
      :type="type"
      class="validate"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
    <label v-if="label" :for="generateId">{{ label }}</label>
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
    value: String
  },
  computed: {
    generateId() {
      return `${this.type}-${Math.random()}`
    }
  }
}
</script>
