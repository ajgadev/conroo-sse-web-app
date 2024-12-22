<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Trucker Reservation Slots</h1>
    <TimeSlotList :timeSlots="timeSlots" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import TimeSlotList from "@/components/TimeSlotList.vue";
import { fetchTimeSlots, setupSSE } from "@/services/api";
import { TimeSlot } from "@/types";

const timeSlots = ref<TimeSlot[]>([]);

onMounted(async () => {
  timeSlots.value = await fetchTimeSlots();
  setupSSE((update) => {
    const index = timeSlots.value.findIndex((slot) => slot.id === update.id);
    if (index !== -1) {
      timeSlots.value[index].capacity.current_capacity = update.currentCapacity;
      timeSlots.value[index].category = update.category;
    }
  });
});
</script>
