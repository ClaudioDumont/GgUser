<template>
  <section class="content content--right">
    <section id="step-one" class="container" v-if="step === 1">
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
    <section id="step-two" class="container" v-if="step === 2">
      <h3 class="step__title">
        So, whats is your name? user name on git too, ok?
      </h3>
      <section class="form__content">
        <label for="" class="form__label">
          Name:
        </label>
        <input type="text" class="form__input">
        <label for="" class="form__label">
          Last Name:
        </label>
        <input type="text" class="form__input">
        <label for="" class="form__label">
          UserName on GitHub:
        </label>
        <input type="text" class="form__input">
      </section>
    </section>

    <section id="step-tree" class="container" v-if="step === 3">
      <h3 class="step__title">
        So far, so good... But i need your email and your agree to terms of use
      </h3>
      <section class="form__content">
        <label for="" class="form__label">
          E-mail:
        </label>
        <input type="mail" class="form__input">
        <div class="agree__terms">
          <input type="checkbox" id="agree-check" class="form__input form__input--styled-checkbox">
          <label for="agree-check" class="form__label form__label--styled-checkbox">
            I agree with the terms =]
          </label>
        </div>
      </section>
    </section>

    <section id="step-four" class="container" v-if="step === 4">
      <h3 class="step__title">
        I Get You!!
      </h3>
      <section class="user">
        <header class="user__header">
          <div class="user__image__container">
            <img src="https://avatars2.githubusercontent.com/u/8548115?v=4" alt="Claudio Dumont" class="user__image">
          </div>
          <div class="user__info__container">
            <h4 class="user__name">
              Claudio Dumont
            </h4>
            <a href="#" class="button button--small">
              View in GitHub
            </a>
            <ul class="user__labels">
              <li class="user__info">Florianópolis - SC</li>
              <li class="user__info">5 Followers</li>
              <li class="user__info">7 Following</li>
            </ul>
            <p class="user__bio">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt vel autem asperiores a veritatis voluptate.
            </p>
          </div>
        </header>
        <section>
            <h4 class="step__title step__title--secondary">
              Your Repos
            </h4>
            <ul class="repos__list">
              <li class="repos__item">
                <a href="#" class="repos__link">
                  Lorem ipsum
                </a>
                <p class="repos__stars">3 Stars</p>
              </li>
              <li class="repos__item">
                <a href="#" class="repos__link">
                  Lorem ipsum
                </a>
                <p class="repos__stars">3 Stars</p>
              </li>
              <li class="repos__item">
                <a href="#" class="repos__link">
                  Lorem ipsum
                </a>
                <p class="repos__stars">3 Stars</p>
              </li>
              <li class="repos__item">
                <a href="#" class="repos__link">
                  Lorem ipsum
                </a>
                <p class="repos__stars">3 Stars</p>
              </li>
              <li class="repos__item">
                <a href="#" class="repos__link">
                  Lorem ipsum
                </a>
                <p class="repos__stars">3 Stars</p>
              </li>
              <li class="repos__item">
                <a href="#" class="repos__link">
                  Lorem ipsum
                </a>
                <p class="repos__stars">3 Stars</p>
              </li>
              <li class="repos__item">
                <a href="#" class="repos__link">
                  Lorem ipsum
                </a>
                <p class="repos__stars">3 Stars</p>
              </li>
              <li class="repos__item">
                <a href="#" class="repos__link">
                  Lorem ipsum
                </a>
                <p class="repos__stars">3 Stars</p>
              </li>
              <li class="repos__item">
                <a href="#" class="repos__link">
                  Lorem ipsum
                </a>
                <p class="repos__stars">3 Stars</p>
              </li>
              <li class="repos__item">
                <a href="#" class="repos__link">
                  Lorem ipsum
                </a>
                <p class="repos__stars">3 Stars</p>
              </li>
              <li class="repos__item">
                <a href="#" class="repos__link">
                  Lorem ipsum
                </a>
                <p class="repos__stars">3 Stars</p>
              </li>
              <li class="repos__item">
                <a href="#" class="repos__link">
                  Lorem ipsum
                </a>
                <p class="repos__stars">3 Stars</p>
              </li>
            </ul>
          </section>
      </section>
    </section>

    <div class="button__container" v-if="step > 1">
      <button
        class="button button--medium"
        @click="prevStage">
          Prev
        </button>
      <button
        class="button button--medium"
        @click="nextStage"
        v-if="step < 4">
          Next
        </button>
    </div>
    <!-- <button @click="getUserInfo">Vai GgUser</button>
      Info do user:{{user}} -->
  </section>
</template>

<script>
export default {
  name: 'FormSteps',
  data() {
    return {
      step: 1
    }
  },
  methods: {
    nextStage () {
      console.log(this.step)
      this.step++
    },
    prevStage () {
      this.step--
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

  @include breakpoint(mobileonly) {
    margin: .5em 0 1.5em 0;
    font-size: 26px;
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
