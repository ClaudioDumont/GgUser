<template>
  <main id="app" class="main">
    <section class="main__content">
      <SidebarSteps />
      <FormSteps />
    </section>
  </main>
</template>

<script>

import axios from 'axios'
import SidebarSteps from './components/SidebarSteps.vue'
import FormSteps from './components/FormSteps.vue'

export default {
  name: 'app',
  components: {
    SidebarSteps,
    FormSteps
  },

  data () {
    return {
      user: [],
      repos: []
    }
  },

  props: {
    
  },

  methods: {
    getUserInfo () {
      axios.get('https://api.github.com/users/viniciuskneves')
      .then((response) => {
        this.user = response.data
        console.log(this.user)
      }),

      axios.get('https://api.github.com/users/viniciuskneves/repos')
      .then((response) => {
        this.repos = response.data
        console.log(this.repos)
      })
    }
  }
}
</script>

<style lang="scss">
@import "~styles/base";

.main {
  display: flex;
  width: 100%;
  min-height: calc(100vh - 2em);
  justify-content: center;
  align-items: center;
  
  &__content {
    max-width: 980px;
    min-height: 680px;
    width: 100%;
    display: flex;
    background: #f2f2f2;
    box-shadow: 1px 2px 20px rgba(0,0,0,.4);
    overflow: hidden;
    @include transition();

    @include breakpoint(mobileonly) {
      flex-direction: column;
      min-height: auto;
    }
  }
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3em 2em;

  &--left {
    width: 40%;
    background: #85889C;
  }

  &--right {
    width: 60%;
  }

  @include breakpoint(mobileonly) {
    width: auto;
    padding: 1em;
  }
}


</style>
