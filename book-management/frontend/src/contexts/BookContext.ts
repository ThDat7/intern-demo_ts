import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface BookContextType {
  selectedBook: string | null
  setSelectedBook: (book: string | null) => void
}

const BookContext = createContext<BookContextType | null>(null)
export default BookContext

export const useBookContext = (): BookContextType => {
  const context = useContext(BookContext)
  if (!context) {
    throw new Error('useBookContext must be used within a BookProvider')
  }
  return context
}
