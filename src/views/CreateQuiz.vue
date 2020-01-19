<template>
  <div class="quiz-creator">
    <div>
      <h1>Создание теста</h1>
      <form @submit="submitHandler">
        <app-input
          v-model="quizName"
          label="Название теста"
        />
        <app-input
          v-for="(control, controlName) of formControls"
          :key="controlName"
          v-model="control.value"
          :type="control.type"
          :valid="control.valid"
          :touched="control.touched"
          :label="control.label"
          :error-message="control.errorMessage"
          :required="control.validation.required"
          @input="changeHandler($event, controlName)"
        />
        <div class="input-field">
          <select ref="select" v-model="rightAnswerId">
            <option v-for="i of 4" :key="i" :value="i">Вариант {{ i }}</option>
          </select>
          <label>Выберите правильный ответ</label>
        </div>
        <app-button @click="addQuestionHandler">Добавить вопрос</app-button>
        <app-button type="success" @click="createQuizHandler">Создать тест</app-button>
      </form>
    </div>
  </div>
</template>

<script>
import M from 'materialize-css';
import { mapGetters } from 'vuex';
import AppInput from '../components/UI/AppInput';
import AppButton from '../components/UI/AppButton';
import { createControl, validate, validateForm } from '../utils/formValidator';

function createOptionControl(number) {
  return createControl({
    id: number,
    label: `Вариант ${number}`,
    errorMessage: 'Значение не может быть пустым'
  }, { required: true })
}

function createFormControl() {
  return {
    question: createControl({
      label: 'Введите вопрос',
      errorMessage: 'Вопрос не может быть пустым'
    }, { required: true }),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  }
}

export default {
  components: {
    AppButton, AppInput
  },
  data: () => ({
    quizName: '',
    rightAnswerId: 1,
    isFormValid: false,
    formControls: createFormControl()
  }),
  computed: {
    ...mapGetters(['newQuiz', 'login'])
  },
  mounted() {
    M.FormSelect.init(this.$refs.select);
  },
  methods: {
    submitHandler(event) {
      event.preventDefault();
    },
    addQuestionHandler(event) {
      event.preventDefault();

      const { question, option1, option2, option3, option4 } = this.formControls;

      const questionItem = {
        question: question.value,
        id: this.newQuiz.length + 1,
        rightAnswerId: this.rightAnswerId,
        answers: [
          { text: option1.value, id: option1.id },
          { text: option2.value, id: option2.id },
          { text: option3.value, id: option3.id },
          { text: option4.value, id: option4.id },
        ]
      };

      this.$store.dispatch('createQuizQuestion', questionItem);

      this.isFormValid = false;
      this.rightAnswerId = 1;
      this.formControls = createFormControl();
    },
    createQuizHandler(event) {
      event.preventDefault();
      this.$store.dispatch('finishCreateQuiz', { name: this.quizName, author: this.login });
      this.quizName = '';
      this.isFormValid = false;
      this.rightAnswerId = 1;
      this.formControls = createFormControl();
    },
    changeHandler(event, controlName) {
      const control = this.formControls[controlName];
      control.touched = true;
      control.valid = validate(control.value, control.validation);
      this.isFormValid = validateForm(this.formControls);
    }
  }
}
</script>

<style lang="scss">
.quiz-creator {
  display: flex;
  justify-content: center;
  padding-top: 50px;
  flex-grow: 1;
  width: 100%;

  > div {
    width: 100%;
    max-width: 600px;
    padding: 0 20px;
  }

  h1 {
    text-align: center;
  }

  form {
    background: #eee;
    border-radius: 10px;
    padding: 15px;
    box-shadow: 2px 2px 2px rgba(0,0,0,.5);
  }

  button {
    margin-right: 10px;
  }
}

</style>
