export interface TimeSlot {
    id: number;
    start_time: string;
    end_time: string;
    category: 'green' | 'yellow' | 'red';
    capacity: {
      current_capacity: number;
      max_capacity: number;
    };
  }
  
  export interface TimeSlotUpdate {
    id: number;
    currentCapacity: number;
    category: 'green' | 'yellow' | 'red';
  }
  
  