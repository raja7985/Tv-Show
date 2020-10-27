<template>
  <v-app-bar app color="rgb(59 5 63)" flat>
    <v-container>
      <v-row class="header_row">
        <router-link to="/" :title="'Go to homepage'">
          <span class="logo_main">
            <img class="logo_img" src="@/assets/tvImage.png" alt="Tv Shows" />
            <span class="logo_txt">TV Shows</span></span>
        </router-link>
        <v-spacer></v-spacer>
        <v-btn
          aria-label="search"
          icon
          color="white"
          @click="SET_OVERLAY_ON_SEARCH(!getOverlayOnSearch)">
          <v-icon>{{ searchIcon }}</v-icon>
        </v-btn>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<style lang="scss">
a {
  text-decoration: none;
}
.logo_main {
  cursor: default;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.logo_txt {
  font-size: 35px;
  color: #fff;
  position: relative;
  top: 1px;
}
.logo_img {
  width: 49px;
  height: 46px;
  margin: 8px 10px 0 0;
}
.header_row {
  align-items: center;
}
@media (max-width: 768px) {
  .logo_img {
    width: 38px;
  }
  .logo_txt {
    font-size: 27px;
  }
}
</style>

<script type="text/javascript">
import { mdiMagnify } from '@mdi/js'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Header',
  data: () => ({
    searchIcon: mdiMagnify
  }),
  computed: {
    ...mapGetters('Search', ['getOverlayOnSearch'])
  },
  methods: {
    ...mapMutations('Search', ['SET_OVERLAY_ON_SEARCH'])
  }
}
</script>
