<template>
  <div v-if="pageName == 'popular'">
    <router-link
      :to="{ name: 'show', params: { id: item.id } }"
      :title="'Go to ' + item.name">
      <v-sheet height="300px">
        <v-img
          height="300px"
          v-if="item.image"
          :src="item.image.original"
          class="topsection-wrapper">
          <v-row align="center" justify="center">
            <v-col cols="10" sm="8" md="8" class="title-section">
              <h1 class="display-2">
                {{ item.name }}
              </h1>
              <div class="d-flex flex-column pt-2">
                <p class="subtitle-1">
                  <span v-if="item.rating" class="rating-info">
                    <span> ( {{ averageRating(item.rating.average) }} / 10 )</span>
                    <v-rating
                      v-model="item.rating.average"
                      background-color="white"
                      color="yellow accent-4"
                      dense
                      length="1"
                      size="25">
                    </v-rating>
                  </span>
                </p>
              </div>
            </v-col>
          </v-row>
        </v-img>
      </v-sheet>
    </router-link>
  </div>
  <div v-else>
    <v-card color="transparent" class="show-card white--text" flat width="200">
      <router-link
        :to="{ name: 'show', params: { id: item.id } }"
        :title="'Go to ' + item.name">
        <template v-if="item.image != null">
          <v-img
            :alt="item.name"
            :src="item.image ? item.image.original : ''"
            class="img-dime" />
        </template>
        <template v-else>
          <v-img
            :alt="item.name"
            src="@/assets/default-movie.png"
            class="img-dime" />
        </template>
        <header>
          <h3 class="subtitle-1 pt-2">
            {{ item.name }}
          </h3>
        </header>
        <span v-if="item.rating" class="rating-info">
          <span> ( {{ averageRating(item.rating.average) }} / 10 )</span>
          <v-rating
            v-model="item.rating.average"
            background-color="white"
            color="yellow accent-4"
            dense
            length="1"
            size="25" >
          </v-rating>
        </span>
      </router-link>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'ShowsGenreList',
  props: {
    item: Object,
    pageName: String
  },
  methods: {
    averageRating (avgRating) {
      return avgRating || 0
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../scss/variables.scss";
.img-dime {
  background-color: rgb(59, 5, 63);
  width: 185px;
  height: 275px;
}
span.base-rating {
  font-size: 12px;
}
.show-card:hover {
  opacity: 0.5;
}
.rating-info {
  display: flex;
  font-size: $app-size-root;
  color: white;
}
.v-application .subtitle-1 {
  color: white;
}
.popular-img {
  width: $complete-space;
  .v-responsive__content > div.v-card {
    width: $complete-space !important;
  }
}
.topsection-wrapper {
  min-height: 300px;
  justify-content: center;
  align-items: center;
  .v-image__image.v-image__image--cover {
    opacity: 0.4;
  }
}
</style>
