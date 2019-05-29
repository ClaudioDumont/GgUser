<template>
  <section class="container error" >
    <h3 class="step__title">
      Something went Wrong
    </h3>
    <img class="error__image" src="../assets/git-cat.png" >

    <p class="error__message">
      The user you requested could not be found. Is there any chance you were wrong when you sent the user name to me?
      Try again, give me another user in GitHub.
    </p>

    <a @click="getNewUser" class="button button--error">
        Make a new query
    </a>
  </section>
</template>
<script>


export default {
  name: 'OnError',
  methods: {
    getNewUser () {
      this.$store.commit('GO_BACK')
    }
  },
}
</script>

<style lang="scss" scoped>
@import "~styles/base";
.error {
  &__image {
    max-height: 190px;
    margin: 0 auto;
    display: block;
    
    @include breakpoint(phablet) {
      max-height: 120px;
    }

    @include breakpoint(mobileonly) {
      max-height: 100px;
    }
  }

  &__message {
    font-size: 22px;
    line-height: 1.8em;
    text-align: center;

    @include breakpoint(phablet) {
      font-size: 18px;
    }

    @include breakpoint(mobileonly) {
      font-size: 16px;
      line-height: 1.6em;
    }
  }
}
</style>
