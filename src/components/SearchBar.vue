<template>
  <v-overlay
    color="#390d4b"
    :absolute="false"
    opacity="1"
    :value="getOverlayOnSearch"
    class="search d-flex"
  >
    <div class="search-overlay">
      <div class="d-flex">
        <v-text-field
          autocomplete="off"
          v-model="searchKeyword"
          id="search-field"
          label="Type minimum 3 characters to search"
        ></v-text-field>
        <v-btn
          class="ml-auto"
          icon
          id="close-btn"
          aria-label="close"
          color="white"
          @click="handleSearch"
        >
          <v-icon>{{ closeIcon }}</v-icon>
        </v-btn>
      </div>

      <div v-if="!isDataLoading">
        <div v-if="tvShows.length > 0" class="search-overlay__listing pt-12">
          <v-slide-group multiple show-arrows>
            <v-slide-item
              v-for="show in tvShows"
              :key="'Search show ' + show.show.id"
              class="pr-4"
            >
              <ShowsGenreList :item="show.show" />
            </v-slide-item>
          </v-slide-group>
        </div>
        <div
          v-if="
            searchKeyword.length > 2 &&
            this.searchEnd &&
            this.tvShows.length == 0
          "
        >
          <p>No Tv Shows Found</p>
        </div>
      </div>
      <Loader v-else />
    </div>
  </v-overlay>
</template>

<script>
import { mdiClose } from '@mdi/js'
import { mapGetters, mapMutations } from 'vuex'
import { getTvShowsOnSearch } from '@/api/show_search_api'
import ShowsGenreList from './ShowsGenreList.vue'
export default {
  name: 'SearchBar',
  components: {
    ShowsGenreList
  },
  data: () => ({
    closeIcon: mdiClose,
    searchKeyword: '',
    tvShows: [],
    timer: null,
    isDataLoading: false,
    searchEnd: false
  }),
  watch: {
    searchKeyword () {
      if (this.searchKeyword && this.searchKeyword.length > 2) {
        this.searchEnd = false
        this.searchShows()
      }
    },
    getOverlayOnSearch (newVal) {
      const elHtml = document.getElementsByTagName('html')[0]
      if (newVal === true) elHtml.style.overflow = 'hidden'
      else elHtml.style.overflow = null
    }
  },
  computed: {
    ...mapGetters('Search', ['getOverlayOnSearch'])
  },
  methods: {
    ...mapMutations('Search', ['SET_OVERLAY_ON_SEARCH']),
    handleSearch () {
      this.SET_OVERLAY_ON_SEARCH(false)
      this.searchKeyword = ''
      this.tvShows = []
    },
    async getSearchResults () {
      getTvShowsOnSearch(this.searchKeyword).then((res) => {
        this.isDataLoading = false
        this.tvShows = res.data
        this.searchEnd = true
        return this.tvShows
      })
    },
    searchShows () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        if (this.searchKeyword && this.searchKeyword.length > 2) {
          this.isDataLoading = true
          this.getSearchResults()
        }
      }, 2000)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/variables.scss";
.search-overlay {
  width: 1140px;
  margin: 0 auto;
  max-width: $complete-space;
}
div .search.v-overlay {
  align-items: initial;
}
</style>
