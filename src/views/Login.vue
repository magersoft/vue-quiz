<template>
    <div class="login">
      <div>
        <h1>Авторизация</h1>

        <form class="login-form" @submit="submitHandler">
          <app-input v-model="formControl.email" label="Email" type="email" />
          <app-input v-model="formControl.password" label="Пароль" type="password" />
          <app-button @click="loginHandler" :disabled="disabled">Войти</app-button>
          <app-button type="success" :disabled="disabled" @click="registerHandler">Регистрация</app-button>
        </form>
      </div>
    </div>
</template>

<script>
import M from 'materialize-css';
import AppButton from '../components/UI/AppButton';
import AppInput from '../components/UI/AppInput';

export default {
  components: {
    AppButton, AppInput
  },
  data: () => ({
    formControl: {
      email: '',
      password: ''
    }
  }),
  computed: {
    disabled() {
      return (!this.formControl.email.length && !this.formControl.password.length)
    }
  },
  mounted() {
    M.updateTextFields();
  },
  methods: {
    submitHandler(event) {
      event.preventDefault();
    },
    loginHandler() {
      this.$store.dispatch('auth', { payload: this.formControl, isLogin: true });
    },
    registerHandler() {
      this.$store.dispatch('auth', { payload: this.formControl });
    }
  }
}
</script>

<style lang="scss">
.login {
  display: flex;
  justify-content: center;
  padding-top: 100px;
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
}

.login-form {
  background: #eee;
  box-shadow: 2px 2px 2px rgba(0,0,0,.5);
  padding: 15px;
  border-radius: 10px;

  button {
    margin-right: 15px;
  }
}
</style>
