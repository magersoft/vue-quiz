<template>
    <nav :class="classes">
        <ul>
            <li @click="changePageHandler">
              <router-link exact to="/">Список</router-link>
            </li>
            <li @click="changePageHandler">
              <router-link to="/login">Авторизация</router-link>
            </li>
            <li @click="changePageHandler">
              <router-link to="/create">Создать тест</router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  computed: {
    classes() {
      return {
        ['drawer']: true,
        ['close']: !this.open
      }
    }
  },
  methods: {
    changePageHandler() {
      this.$emit('change')
    }
  }
}
</script>

<style lang="scss">
.drawer {
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 80%;
  height: 100%;
  max-width: 300px;
  padding: 20px 10px;
  box-sizing: border-box;
  background: white;
  transform: translateX(0px);
  transition: transform .22s ease-in;
  z-index: 90;

  &.close {
    transform: translateX(-300px);
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      margin-bottom: 15px;

      a {
        color: #363d54;
        font-size: 2rem;
        text-decoration: none;
        position: relative;
        transition: opacity .3s;

        &:hover, &.router-link-active {
          opacity: .7;
        }
      }
    }
  }

  .login {
    color: black
  }
}
</style>
