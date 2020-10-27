<template>
  <v-lazy
    :options="{
      threshold: 0.5,
    }"
    transition="fade-transition"
    class="show-detail">
    <v-parallax
      class="details-container"
      v-if="!isDataLoading"
      height="auto"
      :src="showsBackgroundImage">
      <v-container>
        <div class="bookmark-col">
          <router-link to="/" :title="'Go to homepage'">
            <v-icon medium color="#e0d015">{{ backIcon }}</v-icon>
            <span class="home"> Return to Home </span>
          </router-link>
        </div>
        <v-row class="white--text py-md-6">
          <v-col cols="12" md="4">
            <v-img
              :src="detailsPageShowImage"
              class="ml-auto elevation-6 show-img"
              contain
              width="400"
            ></v-img>
          </v-col>
          <v-col cols="12" md="8" class="pa-4">
            <h1 class="display-2">
              {{ getTvShowDetail.name }}
            </h1>
            <div class="d-flex flex-column pt-2">
              <p class="subtitle-1">
                <span
                  v-for="genre in getTvShowDetail.genres"
                  :key="genre"
                  class="pr-2">
                  {{ genre }}
                  <div class="connector"></div>
                </span>
              </p>

              <p v-if="getTvShowDetail.status">
                <span>Status : {{ getTvShowDetail.status }} </span>
              </p>

              <p>Premiered : {{ getTvShowDetail.premiered }}</p>
              <p>
                <span>Duration : {{ getTvShowDetail.runtime }} mins</span>
              </p>
              <p>
                <span>Language : {{ getTvShowDetail.language }} </span>
              </p>
              <p v-if="getTvShowDetail.officialSite && getTvShowDetail.officialSite.length > 0 ">
                <span>Official Website :
                  <a :href="getTvShowDetail.officialSite" class="website"
                    >{{ getTvShowDetail.officialSite }}
                  </a>
                </span>
              </p>
              <p v-if="getTvShowDetail.network">
                <span>Network : {{ getTvShowDetail.network.name }}</span>
              </p>
              <p v-if="getTvShowDetail.network && getTvShowDetail.network.country" >
                <span>Available In :
                  {{ getTvShowDetail.network.country.name }}</span>
              </p>
              <div class="ratings-section" v-if="getTvShowDetail">
                <div class="rating">
                  <span> Rating :</span>
                  <span v-if="getTvShowDetail.rating" class="rating-info">
                    <span> ( {{ this.average }} / 10 ) </span>
                    <v-rating
                      v-model="this.average"
                      background-color="white"
                      color="yellow accent-4"
                      dense
                      length="1"
                      size="25"
                    ></v-rating>
                  </span>
                </div>
              </div>
              <div>
                <span v-if="getTvShowDetail.summary">About :
                  {{ convertHtmlToText(getTvShowDetail.summary) }}</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-parallax>
    <Loader v-else />
  </v-lazy>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import defaultImage from '@/assets/movieposter.jpg'
import { mdiArrowLeftBold } from '@mdi/js'
export default {
  name: 'ShowDetail',
  props: {
    id: [Number, String]
  },
  data: () => ({
    isDataLoading: false,
    average: 0,
    backIcon: mdiArrowLeftBold
  }),
  watch: {
    getTvShowDetail () {
      this.averageRating(this.getTvShowDetail.rating.average)
    }
  },
  computed: {
    ...mapGetters('Shows', ['getTvShowDetail', 'getTvShowImages']),
    showsBackgroundImage () {
      if (this.getTvShowImages && this.getTvShowImages.length <= 0) return ''
      const detailsBackgroundImage = this.getTvShowImages.filter(
        (image) => image.type === 'background'
      )[0]
      return detailsBackgroundImage ? detailsBackgroundImage.resolutions.original.url : ''
    },
    detailsPageShowImage () {
      if (this.getTvShowImages && this.getTvShowImages.length <= 0) return defaultImage
      const detailsTvShowImage = this.getTvShowImages.filter(
        (image) => image.type === 'poster'
      )[0]
      return detailsTvShowImage ? detailsTvShowImage.resolutions.original.url : defaultImage
    }
  },
  mounted () {
    this.onPageLoad()
  },
  methods: {
    ...mapActions('Shows', ['getTvShowDetails']),
    ...mapActions('Shows', ['getTvShowDetailImages']),
    convertHtmlToText (text) {
      return text ? text.replace(/(<([^>]+)>)/g, '') : ''
    },
    async onPageLoad () {
      this.isDataLoading = true
      if (!isNaN(this.id)) {
        await this.getTvShowDetails(this.id)
        await this.getTvShowDetailImages(this.id)
      } else {
        this.$router.push('/404')
      }
      this.isDataLoading = false
    },
    averageRating (rating) {
      this.average = rating || 0
    }
  },
  async beforeRouteUpdate (to, from, next) {
    this.isDataLoading = true
    await this.getTvShowDetailImages(to.params.id)
    await this.getTvShowDetails(to.params.id)
    this.isDataLoading = false
    next()
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/variables.scss";
.connector {
  width: 8px;
  height: 8px;
  background-color: white;
  border-radius: 50%;
  display: inline-block;
  margin-left: 5px;
}
.rating {
  display: flex;
}
.rating-info {
  padding-left: 5px;
  display: flex;
}
.show-img {
  border-radius: 5px;
  border: 2px solid #ffc107;
}
.home {
  color: $yellow-color;
}
.rating-text {
  font-size: $app-size-root;
}
.base-rate {
  font-size: 11px;
}
.ratings-section {
  margin-bottom: $app-size-root;
  display: inline-block;
}
.subtitle-1 span:last-child .connector {
  display: none;
}
.rating {
  display: flex;
}
.details-container {
  min-height: 90vh;
}
.show-detail {
  height: $complete-space;
}
.bookmark-col {
  margin: 22px 0 0;
  padding: 0 0px;
  a {
    position: relative;
    top: -1px;
  }
}
.website {
  color: #f1df0b !important;
  word-break: break-word;

}
@media (max-width: 1023px) {
  .v-image {
    margin: 0 auto;
  }
}
</style>
