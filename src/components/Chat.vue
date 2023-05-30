<script setup>
import {onMounted, ref, watch} from "vue";
import Message from "./Message.vue";
import {http} from "../api"
import conf from "../../public/conf.js"

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
const upscale = ref(0)
const variation = ref(0)
const prompt = ref('')
const taskId = ref('')
const file = ref([])
const isLoading = ref(false)
const showOption = ref(false)
// 是否可以UV操作
const canUV = ref(false)

function newAiMessage(text, url, taskId, timestamp) {
  const message = {
    id: 'AI' + new Date().getMilliseconds(),
    username: 'AI',
    text: text,
    url: url,
    taskId: taskId,
    timestamp: timestamp,
  };
  return messageList.value.push(message) - 1
}

function updateAiMessage(index, failReason, imageUrl, action, id, prompt) {
  messageList.value[index] = {
    ...messageList.value[index],
    text: failReason,
    url: imageUrl,
    timestamp: new Date().toLocaleTimeString(),
    action: action,
    taskId: id,
    prompt: prompt
  }
}

// 查询任务执行结果
function fetchTaskResult(index) {
  http.get(`/mj/task/${taskId.value}/fetch`).then((data) => {
    const {status, imageUrl, failReason, action, id, prompt} = data
    // change image proxy
    const imageProxyUrl = imageUrl.replace(/^https:\/\/cdn\.discordapp\.com/, conf.imgBaseUrl)
    if (status === 'FAILURE') {
      // 生成报错消息
      updateAiMessage(index, failReason, '', action, id, prompt);
      isLoading.value = false
      // 不允许UV操作
      canUV.value = false
      return
    }
    if (status === 'NOT_START' || status === 'SUBMITTED' || status === 'IN_PROGRESS') {
      // 再次查询
      setTimeout(() => {
        fetchTaskResult(index)
      }, 5000)
      return
    }
    updateAiMessage(index, '', imageProxyUrl, action, id, prompt);
    isLoading.value = false
    // 不是放大请求后续允许UV操作
    canUV.value = action !== 'UPSCALE'
  }).catch(() => {
    // 再次查询
    setTimeout(() => {
      fetchTaskResult(index)
    }, 30000)
  })
}

// 提交
const onSubmit = () => {
  // 生成请求参数
  let params = {};
  let text = '';
  let command = '';
  if (upscale.value !== 0) {
    params.action = 'UPSCALE'
    params.prompt = prompt.value
    params.taskId = taskId.value
    params.index = upscale.value
    command = 'U' + upscale.value
  } else if (variation.value !== 0) {
    params.action = 'VARIATION'
    params.prompt = prompt.value
    params.taskId = taskId.value
    params.index = variation.value
    command = 'V' + variation.value
  } else {
    // 空内容不处理
    if (prompt.value.trim() === '') {
      prompt.value = ''
      return
    }
    params.action = 'IMAGINE'
    params.prompt = prompt.value
  }
  // 加到消息列表
  messageList.value.push({
    id: 'user' + new Date().getMilliseconds(),
    username: 'user',
    text: prompt.value,
    command: command,
    url: '',
    timestamp: new Date().toLocaleTimeString(),
  })
  // 清空输入框
  prompt.value = ''
  // 发出请求
  isLoading.value = true
  http.post('/mj/trigger/submit', params).then((data) => {
    const {code, description, result} = data
    if (code !== 1 && code !== 2) {
      // 生成报错回复
      newAiMessage(description, '', '', new Date().toLocaleTimeString());
      isLoading.value = false
      return
    }
    // 生成加载回复
    taskId.value = result
    const index = newAiMessage('', '', result)
    fetchTaskResult(index)
  }).catch(() => {
    isLoading.value = false
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
          :key="message.id"
          :name="message.username"
          :avatar="message.username === 'user'?avatarMe:avatarOther"
          :stamp="message.timestamp"
          :sent="message.username === 'user'"
          :bg-color="message.username === 'user'? ($q.dark.isActive?'light-green-8':'blue-6'):($q.dark.isActive?'purple-8':'orange-6')"
          :text-color=" $q.dark.isActive?'white':'black'"
      >
        <message v-if="message.url || message.text || message.command" :message="message"/>
        <q-spinner-dots v-else/>
      </q-chat-message>
    </q-scroll-area>
    <q-form
        class="col-auto column q-ma-xs"
        @submit.prevent="onSubmit"
    >
      <div class="col-auto row q-pl-xl q-pb-sm" v-if="showOption">
        <div class="col-auto column">
          <q-btn-toggle
              class="col"
              v-model="upscale"
              clearable
              spread
              no-caps
              toggle-color="purple"
              :disable="!canUV"
              @update:model-value="variation=0"
              :options="[
          {label: 'U 1', value: 1},
          {label: 'U 2', value: 2},
          {label: 'U 3', value: 3},
          {label: 'U 4', value: 4},
        ]"
          />
          <q-btn-toggle
              class="col"
              v-model="variation"
              clearable
              spread
              no-caps
              toggle-color="blue"
              :disable="!canUV"
              @update:model-value="upscale=0"
              :options="[
          {label: 'V 1', value: 1},
          {label: 'V 2', value: 2},
          {label: 'V 3', value: 3},
          {label: 'V 4', value: 4},
        ]"
          />
        </div>

      </div>
      <div class="col-auto row">
        <q-btn
            class="col-auto self-end"
            flat
            :icon="showOption?'expand_more':'expand_less'"
            padding="xs"
            @click="showOption=!showOption"
        />
        <q-input
            class="col self-end"
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
            :loading="isLoading"
        />
      </div>
    </q-form>
  </div>


</template>

<style scoped>

#chat {
  max-width: 80%;
  min-width: 600px;
}

</style>
