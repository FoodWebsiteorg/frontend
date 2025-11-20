import { create } from 'zustand';

interface Booking {
  id: string;
  providerId: string;
  date: string;
  timeSlot: string;
  address?: string;
  notes?: string;
  status: string;
}

interface BookingState {
  bookings: Booking[];
  selectedBooking: Booking | null;
  setBookings: (bookings: Booking[]) => void;
  addBooking: (booking: Booking) => void;
  updateBooking: (id: string, updates: Partial<Booking>) => void;
  setSelectedBooking: (booking: Booking | null) => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  bookings: [],
  selectedBooking: null,
  setBookings: (bookings) => set({ bookings }),
  addBooking: (booking) =>
    set((state) => ({ bookings: [...state.bookings, booking] })),
  updateBooking: (id, updates) =>
    set((state) => ({
      bookings: state.bookings.map((b) =>
        b.id === id ? { ...b, ...updates } : b
      ),
    })),
  setSelectedBooking: (booking) => set({ selectedBooking: booking }),
}));

