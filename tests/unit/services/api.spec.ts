import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchTimeSlots, setupSSE } from '@/services/api';

const API_BASE_URL = 'https://timeslot-stream-ha2tva3niq-ey.a.run.app';

describe('API Service', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
    vi.stubGlobal('EventSource', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('fetchTimeSlots', () => {
    it('fetches time slots successfully', async () => {
      const mockResponse = [
        {
          id: 1,
          start_time: '2024-07-23T08:00:00',
          end_time: '2024-07-23T08:30:00',
          category: 'yellow',
          capacity: {
            current_capacity: 20,
            max_capacity: 50
          }
        }
      ];

      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      } as Response);

      const result = await fetchTimeSlots();
      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/timeSlots`);
    });

    it('throws an error when fetch fails', async () => {
      vi.mocked(fetch).mockResolvedValue({
        ok: false
      } as Response);

      await expect(fetchTimeSlots()).rejects.toThrow('Failed to fetch time slots');
    });
  });

  describe('setupSSE', () => {
    it('sets up SSE and handles messages', () => {
      const mockEventSource = {
        onmessage: null as any,
        onerror: null as any,
        close: vi.fn()
      };

      vi.mocked(EventSource).mockImplementation(() => mockEventSource as any);

      const onUpdate = vi.fn();
      const cleanup = setupSSE(onUpdate);

      expect(EventSource).toHaveBeenCalledWith(`${API_BASE_URL}/sse`);

      const mockEvent = { data: JSON.stringify({ id: 1, currentCapacity: 30, category: 'yellow' }) };
      mockEventSource.onmessage(mockEvent);

      expect(onUpdate).toHaveBeenCalledWith({ id: 1, currentCapacity: 30, category: 'yellow' });

      cleanup();
      expect(mockEventSource.close).toHaveBeenCalled();
    });
  });
});

