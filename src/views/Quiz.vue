<template>
    <div class="quiz">
        <loader v-if="loading" />
        <div v-else>
          <h1>{{ quiz.name }}</h1>
        </div>
    </div>
</template>

<script>
import Loader from '../components/UI/Loader';
export default {
  data: () => ({
    quiz: null,
    loading: false
  }),
  components: {
    Loader
  },
  async created() {
    this.loading = true;
    try {
      await this.$store.dispatch('fetchQuizById', this.$route.params.id);
      this.quiz = this.$store.getters.quiz;
    } catch (e) {
      console.error(e)
    }
    this.loading = false
  }
}
</script>

<style>
.quiz {
  display: flex;
  justify-content: center;
  padding-top: 100px;
  flex-grow: 1;
  width: 100%;
}
</style>
