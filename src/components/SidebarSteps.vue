<template>
  <div>
    <h1 class="logo">
      GgUser
    </h1>
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
  </div>
   
</template>

<script>
export default {
  name: 'SidebarSteps',
  props: {
    currentStage: String
  }
}
</script>


<style lang="scss">

@import "~styles/normalize";
@import "~styles/base";

.logo {
    padding: 15px 15px 15px 90px;
    background: url(https://www.pinclipart.com/picdir/big/52-529941_more-graphql-users-github-svg-clipart.png) no-repeat left 5px top 7px;
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

</style>
