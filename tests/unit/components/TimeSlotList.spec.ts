import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TimeSlotList from "@/components/TimeSlotList.vue";
import TimeSlotCard from "@/components/TimeSlotCard.vue";

describe("TimeSlotList", () => {
  const mockTimeSlots = [
    {
      id: 1,
      start_time: "2024-07-22T13:00:00",
      end_time: "2024-07-22T13:30:00",
      category: "yellow" as const,
      capacity: {
        current_capacity: 20,
        max_capacity: 50,
      },
    },
    {
      id: 2,
      start_time: "2024-07-23T14:00:00",
      end_time: "2024-07-23T14:30:00",
      category: "green" as const,
      capacity: {
        current_capacity: 10,
        max_capacity: 50,
      },
    },
  ];

  it("renders correctly", () => {
    const wrapper = mount(TimeSlotList, {
      props: {
        timeSlots: mockTimeSlots,
      },
      global: {
        components: {
          TimeSlotCard,
        },
      },
    });

    expect(wrapper.findAllComponents(TimeSlotCard)).toHaveLength(2);
    expect(wrapper.text()).toContain("Monday, July 22, 2024");
    expect(wrapper.text()).toContain("Tuesday, July 23, 2024");
  });

  it("groups time slots by date", () => {
    const wrapper = mount(TimeSlotList, {
      props: {
        timeSlots: mockTimeSlots,
      },
      global: {
        components: {
          TimeSlotCard,
        },
      },
    });

    const dateGroups = wrapper.findAll("h2");
    expect(dateGroups).toHaveLength(2);
    expect(dateGroups[0].text()).toContain("Monday, July 22, 2024");
    expect(dateGroups[1].text()).toContain("Tuesday, July 23, 2024");
  });
});
