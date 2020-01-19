<template>
  <main class="home">
    <h1>Список вопросов</h1>
    <ul class="collection quiz-list">
      <li v-if="loading" class="collection-item">
        <div class="progress">
          <div class="indeterminate"></div>
        </div>
      </li>
      <li v-for="(quiz, index) of quizes" class="collection-item" :key="index">
        <div>
          {{ quiz.name }} - <small>({{ quiz.author }})</small>
          <router-link :to="{ path: `/quiz/${quiz.id}` }" class="secondary-content">
            <i class="material-icons">send</i>
          </router-link>
        </div>
      </li>
    </ul>
  </main>
</template>

<script>
export default {
  name: 'home',
  data: () => ({
    quizes: null,
    loading: false
  }),
  async created() {
    this.loading = true;
    try {
      await this.$store.dispatch('fetchQuizes');
      this.quizes = this.$store.getters.quizes
    } catch (e) {
      console.error(e);
    }
    this.loading = false;
  }
}
</script>

<style lang="scss">
.quiz-list {
  width: 600px;
  margin: 0 auto;
  color: black;
  border-radius: 10px;
}
</style>
