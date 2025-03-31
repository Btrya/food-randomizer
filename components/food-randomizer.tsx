"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Dices, Plus } from "lucide-react"
import AddFoodForm from "./add-food-form"
import type { FoodItem, FoodCategory } from "@/lib/types"
import { loadFoods, saveFoods } from "@/lib/store"

export default function FoodRandomizer() {
  const [foods, setFoods] = useState<Record<FoodCategory, FoodItem[]>>({
    breakfast: [],
    lunch: [],
    afternoonTea: [],
    dinner: [],
  })
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory>("breakfast")
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null)
  const [isRolling, setIsRolling] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)

  // Load foods from localStorage on component mount
  useEffect(() => {
    const savedFoods = loadFoods()
    if (savedFoods) {
      setFoods(savedFoods)
    } else {
      // Default food items if none are saved
      const defaultFoods: Record<FoodCategory, FoodItem[]> = {
        breakfast: [
          { id: "b1", name: "豆浆油条" },
          { id: "b2", name: "肉包子" },
          { id: "b3", name: "皮蛋瘦肉粥" },
          { id: "b4", name: "煎饼果子" },
          { id: "b5", name: "茶叶蛋" },
          { id: "b6", name: "小米粥" },
        ],
        lunch: [
          { id: "l1", name: "牛肉粿条" },
          { id: "l2", name: "肠粉" },
          { id: "l3", name: "鱼香肉丝" },
          { id: "l4", name: "麻婆豆腐" },
          { id: "l5", name: "红烧排骨" },
          { id: "l6", name: "蛋炒饭" },
          { id: "l7", name: "牛肉面" },
          { id: "l8", name: "宫保鸡丁" },
          { id: "l9", name: "回锅肉" },
        ],
        afternoonTea: [
          { id: "a1", name: "蛋挞" },
          { id: "a2", name: "绿豆糕" },
          { id: "a3", name: "桂花糕" },
          { id: "a4", name: "奶茶" },
          { id: "a5", name: "糖葫芦" },
          { id: "a6", name: "麻团" },
        ],
        dinner: [
          { id: "d1", name: "火锅" },
          { id: "d2", name: "北京烤鸭" },
          { id: "d3", name: "水煮鱼" },
          { id: "d4", name: "小龙虾" },
          { id: "d5", name: "干锅牛肉" },
          { id: "d6", name: "酸菜鱼" },
          { id: "d7", name: "铁板牛肉" },
        ],
      }
      setFoods(defaultFoods)
      saveFoods(defaultFoods)
    }
  }, [])

  const handleRoll = () => {
    if (foods[selectedCategory].length === 0) return

    setIsRolling(true)

    // Simulate rolling through options
    let count = 0
    const totalIterations = 20
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * foods[selectedCategory].length)
      setSelectedFood(foods[selectedCategory][randomIndex])
      count++

      if (count >= totalIterations) {
        clearInterval(interval)
        setIsRolling(false)
      }
    }, 100)
  }

  const handleAddFood = (category: FoodCategory, name: string) => {
    const newFood: FoodItem = {
      id: `${category}-${Date.now()}`,
      name,
    }

    const updatedFoods = {
      ...foods,
      [category]: [...foods[category], newFood],
    }

    setFoods(updatedFoods)
    saveFoods(updatedFoods)
    setShowAddForm(false)
  }

  const handleDeleteFood = (category: FoodCategory, id: string) => {
    const updatedFoods = {
      ...foods,
      [category]: foods[category].filter((food) => food.id !== id),
    }

    setFoods(updatedFoods)
    saveFoods(updatedFoods)
  }

  return (
    <div className="bg-white dark:bg-slate-950 rounded-xl shadow-lg p-6">
      <Tabs
        defaultValue="breakfast"
        value={selectedCategory}
        onValueChange={(value) => {
          setSelectedCategory(value as FoodCategory)
          setSelectedFood(null)
        }}
        className="w-full"
      >
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="breakfast">早餐</TabsTrigger>
          <TabsTrigger value="lunch">中餐</TabsTrigger>
          <TabsTrigger value="afternoonTea">下午茶</TabsTrigger>
          <TabsTrigger value="dinner">晚餐</TabsTrigger>
        </TabsList>

        {Object.entries(foods).map(([category, foodItems]) => (
          <TabsContent key={category} value={category} className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {category === "breakfast" && "早餐"}
                {category === "lunch" && "中餐"}
                {category === "afternoonTea" && "下午茶"}
                {category === "dinner" && "晚餐"}
              </h2>
              <Button variant="outline" size="sm" onClick={() => setShowAddForm(true)}>
                <Plus className="h-4 w-4 mr-1" />
                添加食物
              </Button>
            </div>

            <div className="h-60 border rounded-lg p-4 overflow-hidden relative">
              {foodItems.length === 0 ? (
                <div className="flex h-full items-center justify-center text-slate-400">
                  没有食物项目。点击"添加食物"按钮添加一些！
                </div>
              ) : (
                <div className="space-y-2 overflow-y">
                  {foodItems.map((food) => (
                    <div
                      key={food.id}
                      className="flex justify-between items-center p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <span>{food.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteFood(category as FoodCategory, food.id)}
                        className="h-6 w-6 p-0"
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <AnimatePresence>
                {selectedFood && selectedCategory === category && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm"
                  >
                    <div className="text-center">
                      <motion.div
                        animate={{
                          scale: isRolling ? [1, 1.1, 1] : 1,
                          rotate: isRolling ? [0, 5, -5, 0] : 0,
                        }}
                        transition={{
                          duration: 0.3,
                          repeat: isRolling ? Number.POSITIVE_INFINITY : 0,
                        }}
                        className="text-2xl font-bold mb-2"
                      >
                        {selectedFood.name}
                      </motion.div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {isRolling ? "选择中..." : "就决定是你了！"}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Button onClick={handleRoll} disabled={isRolling || foodItems.length === 0} className="w-full">
              <Dices className="mr-2 h-4 w-4" />
              Roll
            </Button>
          </TabsContent>
        ))}
      </Tabs>

      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowAddForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white dark:bg-slate-900 rounded-xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <AddFoodForm
                onAdd={handleAddFood}
                onCancel={() => setShowAddForm(false)}
                currentCategory={selectedCategory}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

