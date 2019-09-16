<template>
  <aside class="content content--left">
    <h1 class="logo">
      GgUser
    </h1>
      <ul class="steps">
        <li class="steps__item " :class="$route.params.id === 'start' ? 'steps__item--active' : ''">
          <p class="steps__item__text">
            Hey YOU!!
          </p>
        </li>

        <li class="steps__item" :class="$route.params.id === 'names' ? 'steps__item--active' : ''">
          <p class="steps__item__text">
            A lot of names :)
          </p>
        </li>

        <li class="steps__item" :class="$route.params.id === 'email-confirm' ? 'steps__item--active' : ''">
          <p class="steps__item__text">
            Give me your email
          </p>
        </li>

        <li class="steps__item" :class="$route.params.id === 'success' ? 'steps__item--active' : ''">
          <p class="steps__item__text">
            This is your Profile
          </p>
        </li>
      </ul>
  </aside>
</template>

<script>
export default {
  name: 'SidebarSteps',
  computed: {
    currentStep () {
      return this.$store.state.currentStep
    }
  }
}
</script>

<style lang="scss" scoped>
//@import "~styles/base";
@import "~styles/mixins";
@import "~styles/fonts";

.logo {
    background: url('../assets/logo-gguser.png') no-repeat center;
    background-size: contain;
    height: 115px;
    width: 100%;
    text-indent: -999em;
    overflow: hidden;
    margin: 0;

    @include breakpoint(mobileonly) {
      height: 65px;
      margin: .2em 0;
    }
}

.steps {
  margin: 3em 0;
  list-style: none;
  padding: 0 0 0 2em;
  width: 100%;

  @include breakpoint(mobileonly) {
    margin: 0;
    padding: 0;
    width: auto;
    display: flex;
  }

  &__item {
    margin: 1.2em 0;
    font-family: $font-title;
    position: relative;
    color: #fff;
    letter-spacing: 1px;
    font-size: 18px;
    padding: 0 0 0 35px;
    text-shadow: 2px 2px 15px rgba(0,0,0,.5);
    @include transition();

    @include breakpoint(mobileonly) {
        margin: .5em;
        padding: 0;
        width: 20px;
        height: 20px;
    }

    &:before {
      content: '';
      display: block;
      width: 12px;
      height: 12px;
      background: #000;
      border-radius: 50px;
      position: absolute;
      left: 0;
      top: 0;
      border: solid 4px transparent;
    }

    &--active {
      font-size: 26px;
      padding-left: 35px;
      text-shadow: 2px 2px 15px rgba(0,0,0,.9);

      @include breakpoint(mobileonly) {
        padding: 0;
      }

      &:before {
        border-color: #a7a8b1;
        width: 20px;
        height: 20px;
        left: -3px;
        top: 1px;
        box-shadow: 0 1px 5px rgba(0,0,0,.5);

        @include breakpoint(mobileonly) {
          top: -8px;
        }
      }
    }

    &__text {
      @include breakpoint(mobileonly) {
        display: none;
      }
    }
  }
}
</style>
