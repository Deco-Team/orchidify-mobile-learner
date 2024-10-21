import { create } from 'zustand'

type State = {
  filterState: number
}

type Action = {
  setFilterState: (filterState: number) => void
}

export const useStore = create<State & Action>((set) => ({
  filterState: -1,
  setFilterState: (filterState: number) => {
    set(() => ({ filterState }))
  }
}))
