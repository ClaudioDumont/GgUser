<template>
  <main id="app" class="main">
    <section class="main__content">
      <sidebar-steps />
      <form-steps />
    </section>
  </main>
</template>

<script>
import SidebarSteps from '@/components/SidebarSteps.vue'
import FormSteps from '@/components/FormSteps.vue'

export default {
  name: 'app',
  components: {
    SidebarSteps,
    FormSteps
  }
}
</script>

<style lang="scss">
@import "~styles/base";

.main {
  display: flex;
  width: 100%;
  min-height: calc(100vh - 2em);
  justify-content: center;
  align-items: center;

  &__content {
    max-width: 980px;
    width: 100%;
    display: flex;
    background: #f2f2f2;
    box-shadow: 1px 2px 20px rgba(0,0,0,.4);
    overflow: hidden;
    @include transition();

    @include breakpoint(mobileonly) {
      flex-direction: column;
      min-height: auto;
    }
  }
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3em 2em;
  position: relative;
  min-height: 680px;

  @include breakpoint(phablet) {
    min-height: auto;
  }

  @include breakpoint(mobileonly) {
    min-height: auto;
  }

  &--left {
    width: 40%;
    background: #85889C;
    z-index: 9;
  }

  &--right {
    width: 60%;
  }

  @include breakpoint(mobileonly) {
    width: auto;
    padding: 1em;
  }
}
</style>
