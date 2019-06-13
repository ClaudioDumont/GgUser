<template>
  <section class="container">
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
  </section>
</template>
<script>
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'FormStepsTwo',
  data () {
    return {
      formResponseStepOne: {
        name: '',
        lastName: '',
        userName: ''
      }
    }
  },
  methods: {
    setUserAppInfo () {
      const payload = {
        name: this.formResponseStepOne.name,
        lastName: this.formResponseStepOne.lastName,
        userName: this.formResponseStepOne.userName,
        email: ''
      }
      this.$store.commit('CHANGE_USER_APP_INFO', payload)
    },

    nextStage () {
      this.setUserAppInfo()
      this.$router.push({name: 'email'})
      this.$store.commit('INCREMENT_STEP')
    },

    prevStage () {
      this.$router.push({name: 'intro'})
      this.$store.commit('DECREMENT_STEP')
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~styles/base";
</style>
