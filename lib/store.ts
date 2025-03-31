import type { FoodItem, FoodCategory } from "./types"

const STORAGE_KEY = "food-randomizer-data-0331.2"

export function saveFoods(foods: Record<FoodCategory, FoodItem[]>): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(foods))
  }
}

export function loadFoods(): Record<FoodCategory, FoodItem[]> | null {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error("Failed to parse saved foods", e)
      }
    }
  }
  return null
}

