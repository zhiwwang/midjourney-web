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
    <q-btn-group class="col" push>
      <q-btn color="blue-grey-5" push glossy label="U 1" style="width: 54px; height: 36px" @click="uvCallback(message.taskId, 'UPSCALE', 1)"/>
      <q-btn color="blue-grey-5" push glossy label="U 2" style="width: 54px; height: 36px" @click="uvCallback(message.taskId, 'UPSCALE', 1)"/>
      <q-btn color="blue-grey-5" push glossy label="U 3" style="width: 54px; height: 36px" @click="uvCallback(message.taskId, 'UPSCALE', 1)"/>
      <q-btn color="blue-grey-5" push glossy label="U 4" style="width: 54px; height: 36px" @click="uvCallback(message.taskId, 'UPSCALE', 1)"/>
    </q-btn-group>
    <q-btn-group class="col" push>
      <q-btn color="blue-grey-5" push glossy label="V 1" style="width: 54px; height: 36px" @click="uvCallback(message.taskId, 'VARIATION', 1)"/>
      <q-btn color="blue-grey-5" push glossy label="V 2" style="width: 54px; height: 36px" @click="uvCallback(message.taskId, 'VARIATION', 1)"/>
      <q-btn color="blue-grey-5" push glossy label="V 3" style="width: 54px; height: 36px" @click="uvCallback(message.taskId, 'VARIATION', 1)"/>
      <q-btn color="blue-grey-5" push glossy label="V 4" style="width: 54px; height: 36px" @click="uvCallback(message.taskId, 'VARIATION', 1)"/>
    </q-btn-group>
  </div>
  <p
      v-if="message.text"
  >
    {{ message.text }}
  </p>
</template>

<style scoped>
</style>