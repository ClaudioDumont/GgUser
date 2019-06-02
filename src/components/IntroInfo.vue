<template>
  <section id="step-one" class="container" >
    <h3 class="step__title">
      Hey, how are you?!?!
    </h3>
    <p class="intro__info">
      I'am GgUser, i like get info!! So if you give me some info about you i will return to you with your profile's info in github =]
    </p>
    <button class="button" @click="nextStage">
      Let's start!?
    </button>
  </section>
</template>
<script>
export default {
  name: 'IntroInfo',
  methods: {
    nextStage () {
      this.$store.commit('INCREMENT_STEP')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~styles/base";
.intro__info {
  font-size: 24px;
  line-height: 2em;
  text-align: center;
  margin: 2em 0;

  @include breakpoint(mobileonly) {
    margin: 0;
    line-height: 1.5em;
  }
}
</style>
