<template>
  <div class="finish-quiz">
    <ul>
      <li v-for="(item, index) of quiz.items" :key="index">
        <strong>{{ index + 1 }}</strong>.
        {{ item.question }}
        <i :class="[
          'fa',
          results[item.id],
          results[item.id] === 'error' ? 'fa-times' : 'fa-check'
        ]" />
      </li>
    </ul>
    <p>Правильно {{ successCount }} из {{ quiz.items.length }}</p>
    <div>
      <app-button @click="$store.dispatch('quizResetState')">Повторить</app-button>
      <router-link to="/">
        <app-button type="success">Список тестов</app-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import AppButton from '../UI/AppButton';

export default {
  props: {
    results: Object,
    quiz: Object
  },
  components: {
    AppButton
  },
  computed: {
    successCount() {
      return Object.keys(this.results).reduce((total, key) => {
        if (this.results[key] === 'success') {
          total++
        }
        return total
      }, 0)
    }
  }
}
</script>

<style lang="scss">
.finish-quiz {
  padding: 20px;
  color: white;
  border: 2px solid white;
  border-radius: 5px;
  box-sizing: border-box;
  background: rgba(0,0,0,.5);

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      i {
        margin-left: 10px;

        &.success {
          color: rgba(161, 240, 69, .7);
        }

        &.error {
          color: rgba(240, 87, 108, .7);
        }
      }
    }
  }

  button {
    margin-right: 15px;
  }
}
</style>
