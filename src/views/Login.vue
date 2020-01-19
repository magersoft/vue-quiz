<template>
  <div class="login">
    <div>
      <h1>Авторизация</h1>

      <form class="login-form" @submit="submitHandler">
        <app-input
          v-for="(control, controlName) of formControl"
          :key="controlName"
          v-model="control.value"
          :type="control.type"
          :label="control.label"
          :error-message="control.errorMessage"
          :valid="control.valid"
          :touched="control.touched"
          @input="changeHandler($event, controlName)"
        />
        <app-button @click="loginHandler" :disabled="disabled">Войти</app-button>
        <app-button type="success" :disabled="disabled" @click="registerHandler">Регистрация</app-button>
      </form>
    </div>
  </div>
</template>

<script>
import M from 'materialize-css';
import Message from '../utils/Message';
import is from 'is_js';
import { info } from '../language/ru_RU'
import AppButton from '../components/UI/AppButton';
import AppInput from '../components/UI/AppInput';

export default {
  components: {
    AppButton, AppInput
  },
  data: () => ({
    formControl: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Введите корректный email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Пароль',
        errorMessage: 'Введите корректный пароль',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    },
    isFromValid: false
  }),
  computed: {
    disabled() {
      return !this.isFromValid;
    }
  },
  mounted() {
    M.updateTextFields();
  },
  methods: {
    validate(value, validation) {
      if (!validation) {
        return true;
      }

      let isValid = true;
      let errorMessage = '';

      if (validation.required) {
        isValid = value && value.trim() !== '' && isValid;
        errorMessage = 'Это обязательное поле';
      }

      if (validation.email) {
        isValid = value && is.email(value) && isValid;
        errorMessage = 'Введите корректный email';
      }

      if (validation.minLength) {
        isValid = value && value.length >= validation.minLength && isValid;
        errorMessage = `Миниальный длина пароля ${validation.minLength}. Сейчас ${value.length}`;
      }

      return { isValid, errorMessage };
    },
    submitHandler(event) {
      event.preventDefault();
    },
    async loginHandler() {
      const { email, password } = this.formControl;
      await this.$store.dispatch('auth', {
        payload: {
          email: email.value,
          password: password.value
        },
        isLogin: true
      });
      if (this.$store.getters.token) {
        const m = new Message(info.SUCCESS_LOGIN, 'success');
        m.call();
        this.$router.push('/');
      }
    },
    async registerHandler() {
      const { email, password } = this.formControl;
      await this.$store.dispatch('auth', {
        payload: {
          email: email.value,
          password: password.value
        },
      });
      if (this.$store.getters.token) {
        const m = new Message(info.SUCCESS_REGISTER, 'success');
        m.call();
        this.$router.push('/');
      }
    },
    changeHandler(value, controlName) {
      const control = this.formControl[controlName];
      const validator = this.validate(value, control.validation);
      control.touched = true;
      control.valid = validator.isValid;
      control.errorMessage = validator.errorMessage;

      let isFormValid = true;

      Object.keys(this.formControl).forEach(name => {
        isFormValid = this.formControl[name].valid && isFormValid;
      });

      this.isFromValid = isFormValid;
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
