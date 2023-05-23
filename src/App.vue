<script setup>
import Chat from './components/Chat.vue'
import avatarUser from './assets/avatar-user.svg';
import avatarAi from './assets/avatar-ai.svg';
import { ref } from 'vue'



</script>

<template>
  <q-layout class="absolute-full" view="hHr Lpr fFr">
    <q-drawer side="right" :width="200" :breakpoint="800" show-if-above>
      <q-avatar>
        <img :src="avatarUser" alt="user-avatar">
      </q-avatar>
    </q-drawer>

    <q-page-container>
      <Chat :avatar-me="avatarUser" :avatar-other="avatarAi"/>
    </q-page-container>
  </q-layout>
  <q-fab class="fixed-bottom-right q-mb-sm q-mr-sm z-max"
         :model-value="$q.dark.isActive"
         color="accent"
         @click="$q.dark.set(!$q.dark.isActive)"
         icon="light_mode"
         active-icon="dark_mode"/>
</template>

<style scoped>

</style>
