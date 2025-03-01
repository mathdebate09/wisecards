"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useFlashcardStore, type Flashcard } from "@/store/flashcard-store"
import { toast } from "sonner"

interface FlashcardFormProps {
  flashcard?: Flashcard
  onComplete?: () => void
}

export function FlashcardForm({ flashcard, onComplete }: FlashcardFormProps) {
  const [question, setQuestion] = useState(flashcard?.question || "")
  const [answer, setAnswer] = useState(flashcard?.answer || "")
  const { addFlashcard, updateFlashcard } = useFlashcardStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!question.trim() || !answer.trim()) {
      toast.error("Question and answer cannot be empty")
      return
    }

    if (flashcard) {
      updateFlashcard(flashcard.id, question, answer)
      toast.success("Flashcard updated successfully")
    } else {
      addFlashcard(question, answer)
      setQuestion("")
      setAnswer("")
      toast.success("Flashcard created successfully")
    }

    if (onComplete) {
      onComplete()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="question">Question</Label>
        <Input
          id="question"
          placeholder="Enter the question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="answer">Answer</Label>
        <Textarea
          id="answer"
          placeholder="Enter the answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={4}
        />
      </div>
      <Button type="submit" className="w-full">
        {flashcard ? "Update Flashcard" : "Create Flashcard"}
      </Button>
    </form>
  )
}

