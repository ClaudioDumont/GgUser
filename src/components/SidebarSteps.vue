<template>
  <aside class="content content--left">
    <h1 class="logo">
      GgUser
    </h1>
    {{currentStage}}
      <ul class="steps">
        <li class="steps__item steps__item--active">
          <p class="steps__item__text">
            Hey YOU!!
          </p>
        </li>

        <li class="steps__item">
          <p class="steps__item__text">
            A lot of names :)
          </p>
        </li>

        <li class="steps__item">
          <p class="steps__item__text">
            Give me your email
          </p>
        </li>

        <li class="steps__item">
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
  props: {
    currentStage: Number
  },
  computed: {
    stageOne() {
      return this.currentStage === '1' ? 'steps__item--active' : 1;
    }
  }
}
</script>

<style lang="scss">
@import "~styles/base";

.logo {
    padding: 15px 15px 15px 90px;
    background: url('../assets/git-cat.png') no-repeat left 5px top 7px;
    background-size: 70px;
    font-family: $font-title;
    font-size: 50px;
    letter-spacing: 3px;
    margin: 0;
    color: #000;

    @include breakpoint(phablet) {
        font-size: 40px;
        background-size: 57px;
        padding-left: 70px;
    }

    @include breakpoint(mobileonly) {
        font-size: 46px;
    }
}

.steps {
  margin: 3em 0;
  padding: 0;
  list-style: none;

  @include breakpoint(mobileonly) {
    margin: 0;
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

    @include breakpoint(mobileonly) {
        margin: 1em .5em;
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

      &:before {
        border-color: #a7a8b1;
        width: 20px;
        height: 20px;
        left: -3px;
        top: 1px;
        box-shadow: 0 1px 5px rgba(0,0,0,.5);

        @include breakpoint(mobileonly) {
          top: -12px;
        }
      }
    }
  }
}

@include breakpoint(mobileonly) {
  .steps__item__text {
    display: none;
  }
}
</style>
