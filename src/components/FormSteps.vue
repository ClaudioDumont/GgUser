<template>
  <section class="content content--right">
    

    <transition name="slide-fade" mode="out-in">
      <section id="step-one" class="container" v-if="step === 1" key="step-one">
        <h3 class="step__title">
          Hey, how are you?!?!
        </h3>
        <p class="intro__info">
          I'am GgUser, i like get info!! So if you give me a litle info about you i response to you with your profile's info in github =]
        </p>
        <button class="button" @click="nextStage">
          Let's start!?
        </button>
      </section>
    
      <section id="step-two" class="container" v-if="step === 2" key="step-two">
        <h3 class="step__title">
          So, whats is your name? user name on git too, ok?
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
      </section>
    

      <section id="step-three" class="container" v-if="step === 3" key="step-three">
        <h3 class="step__title">
          So far, so good... But i need your email and your agree to terms of use
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
            @click="getInfo(formResponseStepOne.userName)"
            class="button button--medium"
            v-if="!$v.formResponseStepOne.$invalid && !$v.formResponseStepTwo.$invalid"
          >
            Git Info
          </button>
        </div>
      </section>
    
    
      <section id="step-four" class="container" v-if="step === 4 && haveInfo && !showError" key="step-four">
        <a href="/" class="button button--small button--back">
          Make new consulting
        </a>
        <h3 class="step__title">
          I Got You!!
        </h3>
        <section class="user">
          <header class="user__header">
            <div class="user__image__container">
              <img :src="user.avatar_url" :alt="user.name" class="user__image" target="_blank">
            </div>
            <div class="user__info__container">
              <h4 class="user__name">
                {{user.name}}
              </h4>
              <a :href="user.html_url" target="_blank" class="button button--small">
                View in GitHub
              </a>
              <ul class="user__labels">
                <li class="user__info" v-if="user.location">{{user.location}}</li>
                <li class="user__info" v-else>Undefined Location</li>
                <li class="user__info">{{user.followers}} Followers</li>
                <li class="user__info">{{user.following}} Following</li>
              </ul>
              <p class="user__bio" v-if="user.bio">
                {{user.bio}}
              </p>
            </div>

            
          </header>
          <section>
              <h4 class="step__title step__title--secondary">
                Your Repos 
                <span v-if="repos.length > 0">
                  ({{repos.length}})
                </span>
              </h4>
              <ul class="repos__list">
                <li class="repos__item" v-for="repo in repos" :key="repo.id">
                  <a :href="repo.html_url" target="_blank" class="repos__link">
                    {{repo.name}}
                  </a>
                  <p class="repos__stars">
                    {{repo.stargazers_count}}
                      <span v-if="repo.stargazers_count <= 1">Star</span>
                      <span v-if="repo.stargazers_count > 1">Stars</span>
                    </p>
                </li>
              </ul>
            </section>
        </section>
      </section>

      <section class="container error" v-if="showError && step === 4" key="show-error">
        <h3 class="step__title">
          Something went Wrong
        </h3>
        <img class="error__image" src="../assets/git-cat.png" >

        <p class="error__message">
          The user you requested could not be found. Is there any chance you were wrong when you pass the user to me?
          Try again, give me another user in GitHub.
        </p>

        <label for="" class="form__label">
          UserName:
          <p class="form__error" v-if="!$v.formResponseStepOne.userName.required">this field is required</p>
        </label>
        
        <input type="text" v-model="$v.formResponseStepOne.userName.$model"  class="form__input">

        <a @click="getInfo(formResponseStepOne.userName)" class="button button--error">
          Make new consulting
        </a>
      </section>
      
    </transition>
  </section>
</template>

<script>
import axios from 'axios'
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  name: 'FormSteps',
  data() {
    return {
      step: 1,
      haveInfo: false,
      showError: false,
      user: [],
      repos: [],
      formResponseStepOne: {
        name: '',
        lastName: '',
        userName: ''
      },
      formResponseStepTwo: {
        email: '',
        checkbox: ''
      },
    }
  },
  methods: {
    nextStage () {
      if(this.step < 4) {
        this.step++
        this.$emit('currentStage', this.step)
      }
    },
    prevStage () {
      this.step--
      this.$emit('currentStage', this.step)
    },

    getUserInfo(userName) {
      return axios.get(`https://api.github.com/users/${userName}`)
    },

    getReposInfo(userName) {
      return axios.get(`https://api.github.com/users/${userName}/repos`)
    },

    getInfo (userName) {
      axios.all([this.getUserInfo(userName), this.getReposInfo(userName)])
      .then(axios.spread((userResponse, reposResponse) => {
        this.repos = reposResponse.data
        this.user = userResponse.data
        this.haveInfo = true
        this.showError = false
      }))
      .catch((error) => {
        this.showError = true
      })
      .then(() => {
        this.nextStage()
      });
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
        sameAs: sameAs( () => true )
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

.step__title {
  font-family: $font-title;
  font-size: 35px;
  letter-spacing: 1px;
  text-align: center;

  &--secondary {
    margin: .5em 0;
    text-align: left;
    font-size: 26px;
  }

  @include breakpoint(phablet) {
    font-size: 26px;
    margin: .5em 0;
  }

  @include breakpoint(mobileonly) {
    margin: .5em 0 1.5em 0;
    font-size: 24px;
  }
}

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
    margin: 0 0 2em 0;
    color: #333;

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
.user {
  &__header {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 0 0 2em 0;

    @include breakpoint(mobileonly) {
      flex-direction: column;
      align-items: center;
    }
  }

  &__image {
    max-height: 120px;
    width: auto;
    border-radius: 100%;
    box-shadow: 2px 2px 10px rgba(0,0,0,.5);
    margin-right: 30px;

    @include breakpoint(mobileonly) {
      margin: 0;
    }
  }

  &__name {
    font-size: 30px;
    margin: 0 0 .2em 0;
    @include breakpoint(mobileonly) {
      text-align: center;
      font-size: 26px;
    }
  }

  &__bio {
    margin-top: 0;
  }

  &__labels {
    display: flex;
    margin: .5em 0;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    list-style: none;

    @include breakpoint(mobileonly) {
      justify-content: center;
    }
  }

  &__info {
    padding: .3em;
    margin: 0 .3em .5em 0;
    background: #535970;
    color: #fff;
    font-size: 12px;
  }
}

.repos {
  &__list {
    margin: 0 0 .5em 0;
    padding: 0;
    list-style: none;
    max-height: 300px;
    overflow-y: scroll;
  }

  &__item {
    padding: 1em 0 .5em 0;
    border-bottom: solid 1px #CCC;
    &:last-child {
      border: none;
    }
  }

  &__stars {
    margin: .5em 0;
  }

  &__link {
    color: #000;
    font-weight: bold;
    text-decoration: underline;
  }
}

.button__container {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 2em 0 0 0;
}
</style>
