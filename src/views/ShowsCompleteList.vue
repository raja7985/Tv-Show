<template>
  <v-container class="show-listing">
    <v-row v-if="!isDataLoading">
      <ShowsGenereName heading="Most Watched Shows" class="popular-list" />
      <v-carousel height="300" :show-arrows="false" cycle hide-delimiters>
        <v-carousel-item v-for="(show, i) in showsByMostPopular()" :key="i">
          <ShowsGenreList :item="show" pageName="popular" />
        </v-carousel-item>
      </v-carousel>
      <v-row>
        <v-col class="mx-auto" cols="6">
          <v-lazy
            :options="{
              threshold: 0,
            }"
            min-height="290"
            transition="fade-transition"
          >
          </v-lazy>
        </v-col>
      </v-row>
      <v-col v-for="genre in getTvShowGenre" :key="genre" cols="12">
        <ShowsGenereName :heading="genre + ' Shows'" />
        <v-lazy
          :options="{
            threshold: 0,
          }"
          min-height="360"
          transition="fade-transition"
        >
          <v-slide-group multiple show-arrows>
            <v-slide-item
              v-for="show in showsByGenre(genre)"
              :key="'Show ' + show.id"
              class="pr-4"
            >
              <ShowsGenreList :item="show" />
            </v-slide-item>
          </v-slide-group>
        </v-lazy>
      </v-col>
    </v-row>
    <Loader v-else />
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ShowsGenereName from '@/components/ShowsGenereName.vue'
import ShowsGenreList from '@/components/ShowsGenreList.vue'
export default {
  name: 'ShowsCompleteList',
  components: {
    ShowsGenereName,
    ShowsGenreList
  },
  data: () => ({
    isDataLoading: false
  }),
  computed: {
    ...mapGetters('Shows', ['getTvShows', 'getTvShowGenre'])
  },
  async mounted () {
    this.isDataLoading = true
    await this.getAllShowIsnformation()
    this.isDataLoading = false
  },
  methods: {
    ...mapActions('Shows', ['getAllShowIsnformation']),
    showsByGenre (genre) {
      return this.getTvShows.filter(
        (show) => show.genres && show.genres.some((g) => g === genre)
      )
    },
    showsByMostPopular () {
      return this.getTvShows.slice(0, 15)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/variables.scss";
.popular-list {
  padding: 15px 0px 0px 10px;
}
.carousel-image {
  width: 350px;
  margin: 0 auto;
  img {
    height: 300px;
    width: 350px;
  }
}
.show-listing {
  height: $complete-space;
}
.popular-item {
  border-radius: 6px;
}
.white--text.v-card.v-card--flat.v-sheet.theme--dark.transparent {
  width: $complete-space !important;
}
</style>
