<template>
  <v-app>
    <AppHeader />
    <v-main class="app-main">
      <transition name="fade">
        <router-view />
      </transition>
    </v-main>
    <SearchBar />
    <AppFooter />
  </v-app>
</template>
<script>
import AppHeader from '@/components/AppHeader.vue'
import SearchBar from '@/components/SearchBar.vue'
import AppFooter from '@/components/AppFooter.vue'
import { mapMutations } from 'vuex'

export default {
  name: 'App',
  components: {
    AppHeader,
    SearchBar,
    AppFooter
  },
  watch: {
    $route () {
      this.SET_OVERLAY_ON_SEARCH(false)
    }
  },
  methods: {
    ...mapMutations('Search', ['SET_OVERLAY_ON_SEARCH'])
  }
}
</script>

<style lang="scss">
@import "./scss/variables.scss";
.app-main {
  background-color: #390d4b;
}
.v-slide-group__prev,
.v-slide-group__next {
  position: absolute;
  top: -3.75rem;

  .v-icon {
    font-size: 35px;
    color: rgba(255, 255, 255, 1);

    &,
    svg {
      height: 35px;
      width: 35px;
    }
  }

  &.v-slide-group__next--disabled,
  &.v-slide-group__prev--disabled {
    .v-icon.v-icon--disabled {
      color: rgba(255, 255, 255, 0.15) !important;
    }
  }
}
.v-slide-group__prev {
  right: 3rem;
}
.v-slide-group__next {
  right: -0.5rem;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.details-container {
  min-height: 90vh;
  .v-parallax__image-container {
    opacity: 0.15;
  }
}
.search {
  .v-overlay__content {
    width: $complete-space;
    padding: 1rem;
  }
}
.topsection-wrapper {
  .v-image__image.v-image__image--cover {
    opacity: 0.4;
  }
}
@media (max-width: 1240px) {
  body{
  overflow-x: hidden;
}
}
</style>
