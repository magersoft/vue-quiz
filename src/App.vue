<template>
  <div id="app" class="layout">
    <main>
      <router-view />
    </main>
    <div class="poweredBy"></div>
    <menu-toggle :open="open" @open="openHandler" />
    <drawer :open="open" @change="open = false" />
    <app-backdrop v-if="open" @click="open = false" />
  </div>
</template>

<script>
import MenuToggle from './components/UI/MenuToggle';
import Drawer from './components/UI/Drawer';
import AppBackdrop from './components/UI/AppBackdrop';

export default {
  data: () => ({
    open: false
  }),
  components: {
    MenuToggle,
    Drawer,
    AppBackdrop
  },
  created() {
    this.$store.dispatch('autoLogin');
    this.$store.dispatch('getUserData');
  },
  methods: {
    openHandler() {
      this.open = !this.open;
    }
  }
}
</script>

<style lang="scss">
@import '~materialize-css/dist/css/materialize.min.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #303030;
  color: white;

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
  }

  h1 {
    text-align: center;
  }

  .poweredBy {
    position: absolute;
    width: 100px;
    height: 100px;
    background-image: url("/logo.png");
    background-size: cover;
    z-index: 100;
    bottom: 20px;
    right: 20px;
  }
}
</style>
