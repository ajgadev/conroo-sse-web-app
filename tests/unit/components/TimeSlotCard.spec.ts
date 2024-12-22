import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TimeSlotCard from "@/components/TimeSlotCard.vue";

describe("TimeSlotCard", () => {
  const mockTimeSlot = {
    id: 1,
    start_time: "2024-07-23T08:00:00",
    end_time: "2024-07-23T08:30:00",
    category: "yellow" as const,
    capacity: {
      current_capacity: 20,
      max_capacity: 50,
    },
  };

  it("renders correctly", () => {
    const wrapper = mount(TimeSlotCard, {
      props: {
        timeSlot: mockTimeSlot,
      },
    });

    expect(wrapper.text()).toContain("8:00 AM - 8:30 AM");
    expect(wrapper.text()).toContain("yellow");
    expect(wrapper.text()).toContain("20 / 50 slots available");
  });

  it("applies correct CSS classes based on category", () => {
    const wrapper = mount(TimeSlotCard, {
      props: {
        timeSlot: mockTimeSlot,
      },
    });

    expect(wrapper.classes()).toContain("border-l-4");
    expect(wrapper.classes()).toContain("border-yellow-500");
  });

  it("calculates capacity percentage correctly", () => {
    const wrapper = mount(TimeSlotCard, {
      props: {
        timeSlot: mockTimeSlot,
      },
    });

    const progressBar = wrapper.find(".bg-yellow-500");
    expect(progressBar.attributes("style")).toContain("width: 40%");
  });
});
