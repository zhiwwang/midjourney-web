<script setup>
defineProps({
  avatarMe: String,
  avatarOther: String,
})

const messageList = [
  {
    username: 'user',
    text: '我的问题',
    timestamp: '2023-05-24 00:00:00',
  },
  {
    username: 'AI',
    text: 'AI回复',
    timestamp: '2023-05-24 00:01:00',
  },
  {
    username: 'user',
    text: '继续提问',
    timestamp: '2023-05-24 00:02:00',
  },
  {
    username: 'AI',
    text: null,
    timestamp: '2023-05-24 00:02:00',
  }
]

</script>

<template>
  <div id="chat" class="q-pa-md full-height">
    <q-chat-message
        v-for="message in messageList"
        :name="message.username"
        :avatar="message.username === 'user'?avatarMe:avatarOther"
        :stamp="message.timestamp"
        :sent="message.username === 'user'"
        :bg-color="message.username === 'user'?'green-6':'deep-purple-6'"
    >
      <div
          v-if="message.text"
      >
        {{message.text}}
      </div>
      <q-spinner-dots v-else />
    </q-chat-message>
  </div>


</template>

<style scoped>
#chat {
  max-width: 90%;
  min-width: 600px;
}

</style>
