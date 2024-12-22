import { TimeSlot, TimeSlotUpdate } from '@/types';
import { env } from '@/env';

const API_BASE_URL = env.VITE_API_BASE_URL;

export async function fetchTimeSlots(): Promise<TimeSlot[]> {
  const response = await fetch(`${API_BASE_URL}/timeSlots`);
  if (!response.ok) {
    throw new Error('Failed to fetch time slots');
  }
  return response.json();
}

export function setupSSE(onUpdate: (update: TimeSlotUpdate) => void) {
  const eventSource = new EventSource(`${API_BASE_URL}/sse`);

  eventSource.onmessage = (event) => {
    const update = JSON.parse(event.data) as TimeSlotUpdate;
    onUpdate(update);
  };

  eventSource.onerror = (error) => {
    console.error('SSE error:', error);
    eventSource.close();
  };

  return () => {
    eventSource.close();
  };
}

