<template>
  <section class="content content--right">
    <a
      @click="goBack"
      class="button button--small button--back"
      v-if="currentStep === 4 && haveInfo && !showError">
      Make a new query
    </a>
    <transition name="slide-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import IntroInfo from '@/components/IntroInfo.vue'
import FormStepsTwo from '@/components/FormStepsTwo.vue'
import FormStepsThree from '@/components/FormStepsThree.vue'
import OnError from '@/components/OnError.vue'
import OnSuccess from '@/components/OnSuccess.vue'

export default {
  name: 'FormSteps',
  components: {
    IntroInfo,
    FormStepsTwo,
    FormStepsThree,
    OnError,
    OnSuccess
  },

  computed: mapState({
    currentStep: state => state.currentStep,
    haveInfo: state => state.haveInfo,
    showError: state => state.showError
  }),

  methods: {
    goBack () {
      this.$store.commit('GO_BACK')
      this.$router.push({name: 'names'})
    }
  }
}
</script>
<style lang="scss">
//@import "~styles/base";
@import "~styles/mixins";

.form {
  &__label {
    display: block;
    font-size: 16px;
    font-weight: bold;
    width: 100%;
    margin: 0 0 .3em 0;
    color: #535970;
    position: relative;

    &--styled-checkbox {
      position: relative;
      margin: 2em 0;
      cursor: pointer;

      &:before {
        content: '';
        margin-right: 10px;
        display: inline-block;
        vertical-align: text-top;
        width: 20px;
        height: 20px;
        background: white;
        @include transition();
      }

      &:hover {
        &:before {
          background: #ccc;
        }
      }
    }
  }

  &__error {
    color: #ff0000;
    font-size: 11px;
    letter-spacing: 1px;
    font-weight: normal;
    text-transform: uppercase;
    position: absolute;
    top: 20px;
    right: 5px;

    &--agree {
      right: auto;
      top: 15px;
      left: 35px;
    }
  }

  &__input {
    display: block;
    border: none;
    padding: 1em;
    width: 100%;
    line-height: 100%;
    margin: 0 0 2em 0;
    color: #333;

    @include breakpoint(mobileonly) {
      margin: 0 0 1em 0;
    }

    &--styled-checkbox {
      position: absolute;
      opacity: 0;
      width: auto;

      &:checked + .form__label:before {
        background: #535970;
      }

      &:checked + .form__label:after {
        content: '';
        position: absolute;
        left: 5px;
        top: 9px;
        background: #fff;
        width: 2px;
        height: 2px;
        box-shadow:
        2px 0 0 #fff,
        4px 0 0 #fff,
        4px -2px 0 #fff,
        4px -4px 0 #fff,
        4px -6px 0 #fff,
        4px -8px 0 #fff;
        transform: rotate(45deg);
      }
    }
  }
}

.agree__terms {
  position: relative;
}

.button__container {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 2em 0 0 0;
}
</style>
