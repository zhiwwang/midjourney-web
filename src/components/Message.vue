<script setup>
import { NImage, NGradientText } from 'naive-ui'

defineProps({
  message: Object
})
</script>

<template>
  <n-image
      v-if="message.url"
      :src="message.url"
      width="200"
  >
    <q-badge color="orange" floating>22</q-badge>
  </n-image>
  <n-gradient-text
      :gradient="{
      deg: 180,
      from: '#f2c97d',
      to: '#f08a00'
    }"
      class="text-weight-bolder text-h6"
      v-if="message.command"
  >
    {{ message.command }}
  </n-gradient-text>
  <p
      v-if="message.text"
  >
    {{ message.text }}
  </p>
</template>

<style scoped>
</style>