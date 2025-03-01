import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Flashcard {
  id: string
  question: string
  answer: string
  createdAt: number
}

interface FlashcardState {
  flashcards: Flashcard[]
  addFlashcard: (question: string, answer: string) => void
  updateFlashcard: (id: string, question: string, answer: string) => void
  deleteFlashcard: (id: string) => void
  getFlashcard: (id: string) => Flashcard | undefined
}

export const useFlashcardStore = create<FlashcardState>()(
  persist(
    (set, get) => ({
      flashcards: [],

      addFlashcard: (question, answer) => {
        const newFlashcard: Flashcard = {
          id: crypto.randomUUID(),
          question,
          answer,
          createdAt: Date.now(),
        }

        set((state) => ({
          flashcards: [newFlashcard, ...state.flashcards],
        }))
      },

      updateFlashcard: (id, question, answer) => {
        set((state) => ({
          flashcards: state.flashcards.map((card) => (card.id === id ? { ...card, question, answer } : card)),
        }))
      },

      deleteFlashcard: (id) => {
        set((state) => ({
          flashcards: state.flashcards.filter((card) => card.id !== id),
        }))
      },

      getFlashcard: (id) => {
        return get().flashcards.find((card) => card.id === id)
      },
    }),
    {
      name: "flashcards-storage",
    },
  ),
)

