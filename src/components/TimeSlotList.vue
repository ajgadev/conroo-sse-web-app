<template>
  <div>
    <div v-for="(group, date) in groupedTimeSlots" :key="date" class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">{{ formatDate(date) }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <TimeSlotCard v-for="slot in group" :key="slot.id" :timeSlot="slot" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { TimeSlot } from "@/types";
import TimeSlotCard from "@/components/TimeSlotCard.vue";

const props = defineProps<{
  timeSlots: TimeSlot[];
}>();

const groupedTimeSlots = computed(() => {
  return props.timeSlots.reduce((acc, slot) => {
    const date = slot.start_time.split("T")[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(slot);
    return acc;
  }, {} as Record<string, TimeSlot[]>);
});

const formatDate = (dateString: string) => {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
};
</script>
