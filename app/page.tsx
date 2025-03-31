import FoodRandomizer from "@/components/food-randomizer"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-slate-800 dark:text-slate-100">食迷个</h1>
        <FoodRandomizer />
      </div>
    </main>
  )
}

