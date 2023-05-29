<script setup>
import { NImage } from 'naive-ui'

defineProps({
  message: Object
})
</script>

<template>
  <n-image
      v-if="message.url"
      :src="message.url"
      width="200"
  />
  <p
      v-if="message.text"
  >
    {{ message.text }}
  </p>
</template>

<style scoped>

</style>