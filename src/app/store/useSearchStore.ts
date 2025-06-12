import create from 'zustand';

interface SearchStore {
  results: any[];
  setResults: (data: any[]) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  results: [],
  setResults: (data) => set({ results: data }),
}));