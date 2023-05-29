<script setup>
import Chat from './components/Chat.vue'
import avatarUser from './assets/avatar-user.svg';
import avatarAi from './assets/avatar-ai.svg';
import { ref } from 'vue'
import { useQuasar } from 'quasar'
const $q = useQuasar()
</script>

<template>
  <q-layout class="absolute-full" view="hHr Lpr fFr">
    <q-drawer class="q-pa-lg" side="right" :width="250" :breakpoint="900" show-if-above>
      <q-avatar>
        <img :src="avatarUser" alt="user-avatar" />
      </q-avatar>
    </q-drawer>

    <q-page-container class="full-height full-width">
      <Chat :avatar-me="avatarUser" :avatar-other="avatarAi"/>
    </q-page-container>
  </q-layout>
  <q-fab class="fixed-bottom-right q-mb-sm q-mr-sm z-max"
         :model-value="$q.dark.isActive"
         color="accent"
         @click="$q.dark.toggle"
         icon="light_mode"
         active-icon="dark_mode"/>
</template>

<style scoped>

</style>
