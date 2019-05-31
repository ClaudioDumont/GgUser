<template>
  <section id="step-four" class="container">
    <h3 class="step__title">
      I Got You!!
    </h3>
    <section class="user">
      <header class="user__header">
        <div class="user__image__container">
          <img :src="userGitInfo.avatar_url" :alt="userGitInfo.name" class="user__image" target="_blank">
        </div>
        <div class="user__info__container">
          <h4 class="user__name">
            {{ userGitInfo.name || userGitInfo.login || userAppName }}
          </h4>
          <a :href="userGitInfo.html_url" target="_blank" class="button button--small">
            View in GitHub
          </a>
          <a :href="`mailto:${userAppMail}`" target="_blank" class="button button--small button--mail">
            {{userAppMail}}
          </a>
          <ul class="user__labels">
            <li class="user__info" v-if="userGitInfo.location">{{userGitInfo.location}}</li>
            <li class="user__info">{{userGitInfo.followers}} Followers</li>
            <li class="user__info">{{userGitInfo.following}} Following</li>
          </ul>
          <p class="user__bio" v-if="userGitInfo.bio">
            {{userGitInfo.bio}}
          </p>
        </div>
      </header>
      <section>
        <h4 class="step__title step__title--secondary">
          Your Repos
          <span v-if="reposGitInfo.length > 0">
            ({{reposGitInfo.length}})
          </span>
        </h4>
        <ul class="repos__list" v-if="reposGitInfo.length > 0">
          <li class="repos__item" v-for="repo in reposGitInfo" :key="repo.id">
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
        <p class="repos__tips" v-else>
          <strong>Ohhh, you don't have repos!</strong> No matter the outcome, working in public is a gift to the community.
          With every commit, comment, and pull request, you’re creating opportunities for yourself and for
          others to learn and grow. Think about that =]
        </p>
      </section>
    </section>
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'OnSuccess',
  computed: mapState({
    userAppMail: state => state.userAppInfo.email,
    userAppName: state => state.userAppInfo.name,
    reposGitInfo: state => state.reposGitInfo,
    userGitInfo: state => state.userGitInfo
  })
}
</script>

<style lang="scss" scoped>
@import "~styles/base";
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

  &__image__container {
     position:relative;
     height: 120px;
     min-width: 120px;
     box-shadow: 2px 2px 10px rgba(0,0,0,.5);
     margin-right: 30px;
     border-radius: 100%;

    @include breakpoint(mobileonly) {
      margin: 0 0 1em 0;
    }

     &:before {
      @include spinner;
      content: '';
      position: absolute;
      top: calc(50% - 20px);
      left: calc(50% - 20px);
      z-index: 1;
    }
  }

  &__image {
    max-height: 120px;
    padding: 2px;
    width: auto;
    border-radius: 100%;
    box-shadow: 2px 2px 10px rgba(0,0,0,.5);
    position: relative;
    z-index: 2;
    background:#F2F2F2;
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

  &__tips {
    font-size: 18px;
    line-height: 2em;
  }
}
</style>
