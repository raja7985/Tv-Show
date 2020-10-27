<template>
  <h2 class="yellow--text display-1 pb-4">{{ heading }}</h2>
</template>

<script>
export default {
  name: 'ShowsGenereName',
  props: {
    heading: String
  }
}
</script>

<style type="scss">
@media (max-width: 768px) {
  .v-application .display-1 {
    font-size: 1.185rem !important;
  }
}
</style>
