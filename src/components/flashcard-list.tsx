"use client"

import { useFlashcardStore } from "@/store/flashcard-store"
import { FlashcardItem } from "@/components/flashcard-item"

export function FlashcardList() {
  const { flashcards } = useFlashcardStore()

  if (flashcards.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No flashcards yet. Create your first one!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {flashcards.map((flashcard) => (
        <FlashcardItem key={flashcard.id} flashcard={flashcard} />
      ))}
    </div>
  )
}

