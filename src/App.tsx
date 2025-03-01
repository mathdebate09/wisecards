import { ThemeProvider } from "./components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { Header } from "./components/header"
import { FlashcardDashboard } from "./components/flashcard-dashboard"

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="flashcard-theme">
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto py-6 px-4">
          <FlashcardDashboard />
        </main>
        <Toaster />
      </div>
    </ThemeProvider>
  )
}

export default App

