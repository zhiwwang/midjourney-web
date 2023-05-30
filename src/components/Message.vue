<script setup>
import { NImage, NGradientText } from 'naive-ui'

defineProps({
  message: Object,
  uvCallback: Function
})
</script>

<template>
  <n-image
      v-if="message.url"
      :src="message.url"
      width="200"
  >
  </n-image>
  <div class="col-auto column q-gutter-y-sm " v-if="message.url && message.canUV">
    <div class="col">
      <q-btn class="uv-btn q-mr-sm" size="sm" color="primary" push label="U 1" no-wrap @click="uvCallback(message.taskId, 'UPSCALE', 1)"/>
      <q-btn class="uv-btn q-mr-sm" size="sm" color="primary" push label="U 2" no-wrap @click="uvCallback(message.taskId, 'UPSCALE', 2)"/>
      <q-btn class="uv-btn q-mr-sm" size="sm" color="primary" push label="U 3" no-wrap @click="uvCallback(message.taskId, 'UPSCALE', 3)"/>
      <q-btn class="uv-btn q-mr-sm" size="sm" color="primary" push label="U 4" no-wrap @click="uvCallback(message.taskId, 'UPSCALE', 4)"/>
    </div>
    <div class="col">
      <q-btn class="uv-btn q-mr-sm" size="sm" color="secondary" push label="V 1" no-wrap @click="uvCallback(message.taskId, 'VARIATION', 1)"/>
      <q-btn class="uv-btn q-mr-sm" size="sm" color="secondary" push label="V 2" no-wrap @click="uvCallback(message.taskId, 'VARIATION', 2)"/>
      <q-btn class="uv-btn q-mr-sm" size="sm" color="secondary" push label="V 3" no-wrap @click="uvCallback(message.taskId, 'VARIATION', 3)"/>
      <q-btn class="uv-btn q-mr-sm" size="sm" color="secondary" push label="V 4" no-wrap @click="uvCallback(message.taskId, 'VARIATION', 4)"/>
    </div>
  </div>
  <p
      v-if="message.text"
  >
    {{ message.text }}
  </p>
</template>

<style scoped>
.uv-btn {
  width: 44px !important;
  height: 32px !important;
}
</style>