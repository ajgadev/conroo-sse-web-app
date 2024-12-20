<template>
  <div class="bg-white shadow-md rounded-lg p-4" :class="categoryClass">
    <div class="flex justify-between items-center mb-2">
      <span class="font-semibold"
        >{{ formatTime(timeSlot.start_time) }} -
        {{ formatTime(timeSlot.end_time) }}</span
      >
      <span class="text-sm font-medium" :class="categoryTextClass">{{
        timeSlot.category
      }}</span>
    </div>
    <div class="mt-2">
      <div class="w-full bg-gray-200 rounded-full h-2.5">
        <div
          class="h-2.5 rounded-full"
          :class="progressBarClass"
          :style="{ width: `${capacityPercentage}%` }"
        ></div>
      </div>
      <div class="text-sm mt-1 text-gray-600">
        {{ timeSlot.capacity.current_capacity }} /
        {{ timeSlot.capacity.max_capacity }} slots available
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { TimeSlot } from "@/types";

const props = defineProps<{
  timeSlot: TimeSlot;
}>();

const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const categoryClass = computed(() => {
  switch (props.timeSlot.category) {
    case "green":
      return "border-l-4 border-green-500";
    case "yellow":
      return "border-l-4 border-yellow-500";
    case "red":
      return "border-l-4 border-red-500";
    default:
      return "";
  }
});

const categoryTextClass = computed(() => {
  switch (props.timeSlot.category) {
    case "green":
      return "text-green-600";
    case "yellow":
      return "text-yellow-600";
    case "red":
      return "text-red-600";
    default:
      return "";
  }
});

const progressBarClass = computed(() => {
  switch (props.timeSlot.category) {
    case "green":
      return "bg-green-500";
    case "yellow":
      return "bg-yellow-500";
    case "red":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
});

const capacityPercentage = computed(() => {
  return (
    (props.timeSlot.capacity.current_capacity /
      props.timeSlot.capacity.max_capacity) *
    100
  );
});
</script>
