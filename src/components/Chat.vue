<script setup>
import {onMounted, ref, watch} from "vue";

defineProps({
  avatarMe: String,
  avatarOther: String,
})
const thumbStyle = {
  width: 0
}
const messageList = ref([]
)

const scrollAreaRef = ref(null)

const prompt = ref('')
const file = ref([])

const onSubmit = () => {
  if (prompt.value.trim() === '') {
    prompt.value = ''
    return
  }
  messageList.value.push({
    username: 'user',
    text: prompt.value,
    url: '',
    timestamp: new Date().toLocaleTimeString(),
  })
  prompt.value = ''
  //TODO 请求响应
  messageList.value.push({
    username: 'AI',
    text: '',
    url: '',
    timestamp: new Date().toLocaleTimeString(),
  })

}
const scrollToBottom = () => {
  scrollAreaRef.value.setScrollPosition('vertical', scrollAreaRef.value.getScroll().verticalSize, 300)
}
watch(messageList, () => {
  scrollToBottom()
}, {deep: true});
onMounted(() => {
  scrollToBottom()
})
</script>

<template>
  <div id="chat" class="column q-pa-md q-mx-auto full-height">
    <q-scroll-area class="col full-height" :thumb-style="thumbStyle" ref="scrollAreaRef">
      <q-chat-message
          v-for="message in messageList"
          :name="message.username"
          :avatar="message.username === 'user'?avatarMe:avatarOther"
          :stamp="message.timestamp"
          :sent="message.username === 'user'"
          :bg-color="message.username === 'user'? ($q.dark.isActive?'light-green-8':'blue-6'):($q.dark.isActive?'purple-8':'orange-6')"
          :text-color=" $q.dark.isActive?'white':'black'"
      >
        <div v-if="message.image || message.text">
          <q-img
              v-if="message.image"
              :src="message.image"
              style="height: 140px; max-width: 150px"
          />
          <p
              v-if="message.text"
          >
            {{ message.text }}
          </p>
        </div>
        <q-spinner-dots v-if="!message.image && !message.text"/>
      </q-chat-message>
    </q-scroll-area>
    <q-form
        class="col-auto row q-ma-xs"
        @submit="onSubmit"
    >
      <q-input
          class="col"
          outlined
          dense
          autogrow
          v-model="prompt"
          placeholder="prompt"
      />
      <q-btn
          style="height: 40px"
          class="col-auto self-end"
          label="发送"
          type="submit"
          color="pink-6"
          size="md"
      />
    </q-form>
  </div>


</template>

<style scoped>

#chat {
  max-width: 80%;
  min-width: 600px;
}

</style>
