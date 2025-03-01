"use client"

import { useState } from "react"
import { Edit, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FlashcardForm } from "@/components/flashcard-form"
import { useFlashcardStore, type Flashcard } from "@/store/flashcard-store"
import { toast } from "sonner"

interface FlashcardItemProps {
  flashcard: Flashcard
  studyMode?: boolean
}

export function FlashcardItem({ flashcard, studyMode = false }: FlashcardItemProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const { deleteFlashcard } = useFlashcardStore()

  const handleDelete = () => {
    deleteFlashcard(flashcard.id)
    toast.success("Flashcard deleted successfully")
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <>
      <Card
        className={`relative h-64 w-full cursor-pointer transition-all duration-500 ${
          studyMode ? "transform-gpu" : ""
        }`}
        onClick={studyMode ? handleFlip : undefined}
      >
        <div
          className={`absolute inset-0 w-full h-full transition-all duration-500 transform-gpu ${
            isFlipped ? "rotateY-180" : ""
          }`}
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "",
            backfaceVisibility: "hidden",
          }}
        >
          <CardContent className="flex flex-col justify-between h-full p-6">
            <div className="flex-1 flex items-center justify-center">
              <p className="text-lg text-center">{flashcard.question}</p>
            </div>
            {!studyMode && (
              <div className="flex justify-end space-x-2 mt-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsEditDialogOpen(true)
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDelete()
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </div>

        <div
          className={`absolute inset-0 w-full h-full transition-all duration-500 transform-gpu ${
            isFlipped ? "" : "rotateY-180"
          }`}
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "" : "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <CardContent className="flex flex-col justify-between h-full p-6 bg-muted">
            <div className="flex-1 flex items-center justify-center">
              <p className="text-lg text-center">{flashcard.answer}</p>
            </div>
            {!studyMode && (
              <div className="flex justify-end space-x-2 mt-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsEditDialogOpen(true)
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDelete()
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </div>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Flashcard</DialogTitle>
          </DialogHeader>
          <FlashcardForm flashcard={flashcard} onComplete={() => setIsEditDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  )
}

