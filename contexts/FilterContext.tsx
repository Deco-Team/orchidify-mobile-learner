// BottomSheetContext.tsx
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import React, { createContext, useContext, useRef, RefObject, PropsWithChildren } from 'react'

// Define the type for the context
interface BottomSheetContextType {
  bottomSheetModalRef: RefObject<BottomSheetModal>
}

// Initialize context with default values
const BottomSheetContext = createContext<BottomSheetContextType | undefined>(undefined)

export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext)
  if (!context) {
    throw new Error('useBottomSheet must be used within a BottomSheetProvider')
  }
  return context
}

export const BottomSheetProvider = ({ children }: PropsWithChildren) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  return <BottomSheetContext.Provider value={{ bottomSheetModalRef }}>{children}</BottomSheetContext.Provider>
}
