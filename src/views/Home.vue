<template>
  <div class="quiz-list">
    <div>
      <h1>Список вопросов</h1>
      <ul class="collection">
        <li v-if="loading" class="collection-item">
          <div class="progress">
            <div class="indeterminate"></div>
          </div>
        </li>
        <li v-for="(quiz, index) of quizes" class="collection-item" :key="index">
          <div>
            {{ quiz.name }} - <small>({{ quiz.author }})</small>
            <div class="secondary-content actions">
              <i
                v-if="quiz.author === login"
                class="material-icons red-text darken-2"
                style="cursor: pointer"
                @click="removeQuiz(quiz.id)"
              >
                delete
              </i>
              <router-link :to="{ path: `/quiz/${quiz.id}` }" class="secondary-content">
                <i class="material-icons">send</i>
              </router-link>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'home',
  data: () => ({
    loading: false
  }),
  computed: {
    ...mapGetters(['login', 'quizes'])
  },
  async created() {
    this.loading = true;
    try {
      await this.$store.dispatch('fetchQuizes');
    } catch (e) {
      console.error(e);
    }
    this.loading = false;
  },
  methods: {
    ...mapActions({
      removeQuiz: 'removeQuiz'
    })
  }
}
</script>

<style lang="scss">
.quiz-list {
  display: flex;
  justify-content: center;
  flex-grow: 1;
  margin: 0 15px;

  > div {
    margin: 0 auto;
  }

  .actions {
    width: max-content;
    display: flex;
    justify-content: space-between;
    i {
      padding-left: 10px;
    }
  }

  ul {
    color: black;
    border-radius: 10px;
  }
}
</style>
