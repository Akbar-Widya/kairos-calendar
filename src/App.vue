<template>
  <div v-for="event in events" :key="event.id">
    <p>{{ event.title }}</p>
    <p>{{ event.date }}</p>
  </div>
</template>

<script setup lang="ts">
import { useEvents } from '@/composables/useEvents';

const {events} = useEvents();
</script>