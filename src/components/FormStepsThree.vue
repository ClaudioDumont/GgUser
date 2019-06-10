<template>
  <section class="container">
    <h3 class="step__title">
        So far, so good... But i need your email and your agreement to terms of use
    </h3>
    <section class="form__content">
        <label for="" class="form__label">
        E-mail:
        <p class="form__error" v-if="!$v.formResponseStepTwo.email.required">this field is required</p>
        <p class="form__error" v-if="!$v.formResponseStepTwo.email.email">
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
    </section>
</template>
<script>
import axios from 'axios'
import { loadProgressBar } from 'axios-progress-bar'
import { required, email, sameAs } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
export default {
  name: 'FormStepsThree',
  data () {
    return {
      formResponseStepTwo: {
        email: '',
        checkbox: ''
      }
    }
  },

  computed: mapState({
    userAppName: state => state.userAppInfo.name,
    userAppLastName: state => state.userAppInfo.Lastname,
    GitUserName: state => state.userAppInfo.userName
  }),

  methods: {
    setUserAppInfo () {
      const payload = {
        name: '',
        lastName: '',
        userName: '',
        email: this.formResponseStepTwo.email
      }
      this.$store.commit('CHANGE_USER_APP_INFO', payload)
    },

    nextStage () {
      this.setUserAppInfo()
      this.$store.commit('INCREMENT_STEP')
    },

    prevStage () {
      this.$store.commit('DECREMENT_STEP')
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

<style lang="scss" scoped>
@import "~styles/base";
</style>
