<template>
  <nav>
    <div class="nav-wrapper red darken-1">
      <a href="/" class="brand-logo center">Vue.js</a>
      <ul id="nav-mobile" class="left hide-on-med-and-down">
        <li v-for="(link, index) of links" :key="index">
          <router-link :to="link.to" :exact="link.exact" active-class="active">
            {{ link.label }}
          </router-link>
        </li>
        <li v-if="!!token" @click="$store.dispatch('logout')">
          <a href="#">Выйти</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    links: Array
  },
  computed: {
    ...mapGetters(['token'])
  }
}
</script>
