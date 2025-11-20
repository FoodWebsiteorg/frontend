import { create } from 'zustand';

interface FilterState {
  category: string;
  location: string;
  availability: string;
  experience: string;
  verified: string;
  priceMin: string;
  priceMax: string;
  rating: string;
  language: string;
  gender: string;
  workType: string;
  emergency: string;
  setFilter: (key: string, value: string) => void;
  resetFilters: () => void;
  getFilters: () => Record<string, string>;
}

export const useFilterStore = create<FilterState>((set) => ({
  category: '',
  location: '',
  availability: '',
  experience: '',
  verified: '',
  priceMin: '',
  priceMax: '',
  rating: '',
  language: '',
  gender: '',
  workType: '',
  emergency: '',
  setFilter: (key, value) => set((state) => ({ ...state, [key]: value })),
  resetFilters: () =>
    set({
      category: '',
      location: '',
      availability: '',
      experience: '',
      verified: '',
      priceMin: '',
      priceMax: '',
      rating: '',
      language: '',
      gender: '',
      workType: '',
      emergency: '',
    }),
  getFilters: () => {
    const state = useFilterStore.getState();
    const filters: Record<string, string> = {};
    Object.keys(state).forEach((key) => {
      if (
        !['setFilter', 'resetFilters', 'getFilters'].includes(key) &&
        state[key as keyof FilterState]
      ) {
        filters[key] = state[key as keyof FilterState] as string;
      }
    });
    return filters;
  },
}));

