<template>
  <section class="content content--right">
    <a
      @click="goBack"
      class="button button--small button--back"
      v-if="currentStep === 4 && haveInfo && !showError">
      Make a new query
    </a>
    <transition name="slide-fade" mode="out-in">
      <intro-info v-if="currentStep === 1" key="step-one" />
      <form-steps-two id="step-two" v-if="currentStep === 2" key="step-two" />
      <!-- <section id="step-two" class="container" v-if="currentStep === 2" key="step-two">
        <h3 class="step__title">
          So, whats is your name? and user name on GitHub too, ok?
        </h3>
        <section class="form__content">
          <label for="" class="form__label">
            Name:
            <p class="form__error" v-if="!$v.formResponseStepOne.name.required">this field is required</p>
            <p
              class="form__error"
              v-if="!$v.formResponseStepOne.name.minLength">
                Field must have at least {{ $v.formResponseStepOne.name.$params.minLength.min }} characters.
            </p>
          </label>
          <input
            type="text"
            v-model="$v.formResponseStepOne.name.$model"
            class="form__input">
          <label for="" class="form__label">
            Last Name:
            <p class="form__error" v-if="!$v.formResponseStepOne.lastName.required">this field is required</p>
            <p
              class="form__error"
              v-if="!$v.formResponseStepOne.lastName.minLength">
                Field must have at least {{ $v.formResponseStepOne.lastName.$params.minLength.min }} characters.
            </p>
          </label>
          <input type="text" v-model="$v.formResponseStepOne.lastName.$model" class="form__input">
          <label for="" class="form__label">
            UserName on GitHub:
            <p class="form__error" v-if="!$v.formResponseStepOne.userName.required">this field is required</p>
          </label>
          <input type="text" v-model="$v.formResponseStepOne.userName.$model"  class="form__input">
        </section>
        <div class="button__container">
          <button
            class="button button--medium"
            @click="prevStage">
              Prev
            </button>
          <button
            class="button button--medium"
            @click="nextStage"
            v-if="!$v.formResponseStepOne.$invalid">
              Next
          </button>
        </div>
      </section> -->
      <form-steps-three  id="step-three" v-if="currentStep === 3" key="step-three" />
      <!-- <section id="step-three" class="container" v-if="currentStep === 3" key="step-three">
        <h3 class="step__title">
          So far, so good... But i need your email and your agreement to terms of use
        </h3>
        <section class="form__content">
          <label for="" class="form__label">
            E-mail:
            <p class="form__error" v-if="!$v.formResponseStepTwo.email.required">this field is required</p>
            <p
              class="form__error" v-if="!$v.formResponseStepTwo.email.email">
                You must be use a valid email account
            </p>
          </label>
          <input type="mail"  class="form__input" v-model="$v.formResponseStepTwo.email.$model">
          <div class="agree__terms">
            <p
              class="form__error form__error--agree"
              v-if="$v.formResponseStepTwo.checkbox.$invalid">
              I need you agree with the terms
            </p>
            <input
              type="checkbox"
              id="agree-check"
              class="form__input form__input--styled-checkbox"
              v-model="$v.formResponseStepTwo.checkbox.$model"
              >
            <label for="agree-check" class="form__label form__label--styled-checkbox">
              I agree with the terms =]
            </label>
          </div>
        </section>
        <div class="button__container">
          <button
            class="button button--medium"
            @click="prevStage">
              Prev
            </button>

          <button
            @click="getInfo(GitUserName)"
            class="button button--medium"
            v-if="!$v.formResponseStepTwo.$invalid"
          >
            Git Info
          </button>
        </div>
      </section> -->
      <on-success v-if="currentStep === 4 && haveInfo && !showError" key="step-four" />
      <on-error v-if="showError && currentStep === 4" key="show-error" />
    </transition>
  </section>
</template>

<script>
import axios from 'axios'
import { loadProgressBar } from 'axios-progress-bar'
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
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

  data () {
    return {
      haveInfo: false,
      showError: false,
      formResponseStepOne: {
        name: '',
        lastName: '',
        userName: ''
      },
      formResponseStepTwo: {
        email: '',
        checkbox: ''
      }
    }
  },

  computed: mapState({
    currentStep: state => state.currentStep,
    GitUserName: state => state.userAppInfo.userName
  }),

  methods: {
    setUserAppInfo () {
      const payload = {
        name: this.formResponseStepOne.name,
        lastName: this.formResponseStepOne.lastName,
        userName: this.formResponseStepOne.userName,
        email: this.formResponseStepTwo.email
      }
      this.$store.commit('CHANGE_USER_APP_INFO', payload)
    },

    nextStage () {
      this.$store.commit('INCREMENT_STEP')
    },

    prevStage () {
      this.$store.commit('DECREMENT_STEP')
    },

    goBack () {
      this.$store.commit('GO_BACK')
    },

    getUserInfo (userName) {
      return axios.get(`https://api.github.com/users/${userName}`)
    },

    getReposInfo (userName) {
      return axios.get(`https://api.github.com/users/${userName}/repos`)
    },

    getInfo (userName) {
      loadProgressBar() // Function to call loading bar
      this.setUserAppInfo()
      axios.all([this.getUserInfo(userName), this.getReposInfo(userName)])
        .then(axios.spread((userResponse, reposResponse) => {
          this.$store.commit('SET_USER_INFO', userResponse.data)
          this.$store.commit('SET_REPOS_INFO', reposResponse.data)

          this.haveInfo = true
          this.showError = false
        }))
        .catch((error) => {
          console.log(error)
          this.showError = true
        })
        .then(() => {
          this.nextStage()
        })
    }
  },

  validations: {
    formResponseStepOne: {
      name: {
        required,
        minLength: minLength(3)
      },
      lastName: {
        required,
        minLength: minLength(3)
      },
      userName: {
        required
      }
    },

    formResponseStepTwo: {
      email: {
        required,
        email
      },
      checkbox: {
        required,
        sameAs: sameAs(() => true)
      }
    }
  }
}
</script>
<style lang="scss">
@import "~styles/base";

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
