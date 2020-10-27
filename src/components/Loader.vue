<template>
  <div class="loader d-flex align-center justify-center">
    <v-progress-circular
      :size="60"
      :width="4"
      color="#e0d015"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<style>
.loader {
  height: 100%;
  width: 100%;
}
</style>
