<script setup>
import {onMounted, ref, watch} from "vue";
import Message from "./Message.vue";
import {http} from "../api"

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

function newAiMessage(text, url) {
  const message = {
    username: 'AI',
    text: text,
    url: url,
    timestamp: new Date().toLocaleTimeString(),
  };
  messageList.value.push(message)
  return message
}

function fetchTaskResult(taskId, message) {
  http.get(`/mj/task/${taskId}/fetch`).then((data) => {
    const {status, imageUrl, failReason} = data
    if (status === 'FAILURE') {
      // 生成报错消息
      message.text = failReason
      return
    }
    if (status === 'NOT_START' || status === 'SUBMITTED' || status === 'IN_PROGRESS') {
      // 生成报错消息
      setTimeout(() => {
        fetchTaskResult(taskId, message)
      }, 10000)
      return
    }
    message.url = imageUrl
  })
}

const onSubmit = () => {
  const text = prompt.value
  // 空内容不处理
  if (text.trim() === '') {
    prompt.value = ''
    return
  }
  // 加到消息列表
  messageList.value.push({
    username: 'user',
    text: text,
    url: '',
    timestamp: new Date().toLocaleTimeString(),
  })
  // 清空输入框
  prompt.value = ''
  // 请求响应
  http.post('/mj/trigger/submit', {
    action: 'IMAGINE',
    prompt: 'text'
  }).then((data) => {
    const {code, description, result} = data
    debugger
    if (code !== 1 && code !== 2) {
      // 生成报错消息
      newAiMessage(description);
      return
    }
    const taskId = result
    const message = newAiMessage('', '')
    fetchTaskResult(taskId, message)
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
        <q-spinner-dots v-if="!message.image && !message.text"/>
        <message v-else :message="message"/>
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
