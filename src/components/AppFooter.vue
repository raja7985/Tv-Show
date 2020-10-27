<template>
  <v-footer padless>
    <v-card flat tile width="100%" class="page-footer text-center">
      <v-divider></v-divider>
      <v-card-text class="white--text">
        <strong>All Tv Shows</strong> Copyright &copy;
        {{ new Date().getFullYear() }}
      </v-card-text>
    </v-card>
  </v-footer>
</template>
<style type="scss" scoped>
.page-footer {
  background-color: rgb(59, 5, 63);
}
</style>
