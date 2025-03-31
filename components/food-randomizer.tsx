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
    supper: []
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
          // 原有条目
          { id: "b1", name: "豆浆油条" },
          { id: "b2", name: "肉包子" },
          { id: "b3", name: "皮蛋瘦肉粥" },
          { id: "b4", name: "煎饼果子" },
          { id: "b5", name: "茶叶蛋" },
          { id: "b6", name: "小米粥" },
          
          // 新增潮式早餐
          { id: "b7", name: "潮州白粥配杂咸" },
          { id: "b8", name: "猪肠胀糯米" },
          { id: "b9", name: "咸水粿" },
          { id: "b10", name: "红桃粿" },
          { id: "b11", name: "鼠曲粿" },
          { id: "b12", name: "菜头粿（萝卜糕）" },
          { id: "b13", name: "糕烧番薯芋" },
          { id: "b14", name: "潮州肠粉（花生酱）" },
          { id: "b15", name: "麦粿" },
          { id: "b16", name: "栀粽" },
          { id: "b17", name: "姜薯豆浆" },
          { id: "b18", name: "鲎粿" },
          { id: "b19", name: "糯米猪血汤" },
          { id: "b20", name: "腐乳饼" },
          { id: "b21", name: "凤凰浮豆干" },
          { id: "b22", name: "甜糯米粥" },
          { id: "b23", name: "潮式炒粿条" }
        ],
        lunch: [
          // 原有条目
          { id: "l1", name: "牛肉粿条" },
          { id: "l2", name: "肠粉" },
          { id: "l3", name: "鱼香肉丝" },
          { id: "l4", name: "麻婆豆腐" },
          { id: "l5", name: "红烧排骨" },
          { id: "l6", name: "蛋炒饭" },
          { id: "l7", name: "牛肉面" },
          { id: "l8", name: "宫保鸡丁" },
          { id: "l9", name: "回锅肉" },
          
          // 新增潮式午餐
          { id: "l10", name: "潮州卤鹅" },
          { id: "l11", name: "蚝烙（蚵仔煎）" },
          { id: "l12", name: "炒薄壳（海瓜子）" },
          { id: "l13", name: "护国菜（番薯叶羹）" },
          { id: "l14", name: "菜脯煎蛋" },
          { id: "l15", name: "返沙芋头" },
          { id: "l16", name: "豆酱焗鸡" },
          { id: "l17", name: "生腌虾姑" },
          { id: "l18", name: "潮州鱼丸汤" },
          { id: "l19", name: "苦瓜煲" },
          { id: "l20", name: "金瓜烙" },
          { id: "l21", name: "沙茶牛肉炒芥兰" },
          { id: "l22", name: "潮式腌面" },
          { id: "l23", name: "菜脯焖鱼" },
          { id: "l24", name: "橄榄猪肺汤" },
          { id: "l25", name: "潮州粉粿" },
          { id: "l26", name: "梅菜扣肉" },
          { id: "l27", name: "虾枣拼粿肉" }
        ],
        afternoonTea: [
          // 原有条目
          { id: "a1", name: "蛋挞" },
          { id: "a2", name: "绿豆糕" },
          { id: "a3", name: "桂花糕" },
          { id: "a4", name: "奶茶" },
          { id: "a5", name: "糖葫芦" },
          { id: "a6", name: "麻团" },
          
          // 新增潮式茶点
          { id: "a7", name: "鸭母捻" },
          { id: "a8", name: "草粿（仙草冻）" },
          { id: "a9", name: "清心丸绿豆爽" },
          { id: "a10", name: "落汤钱（糯米糍）" },
          { id: "a11", name: "束砂（花生糖）" },
          { id: "a12", name: "龙湖酥糖" },
          { id: "a13", name: "芋泥白果" },
          { id: "a14", name: "老香黄蜜饯" },
          { id: "a15", name: "南糖" },
          { id: "a16", name: "冬瓜册" },
          { id: "a17", name: "书册糕" },
          { id: "a18", name: "姜薯桃" },
          { id: "a19", name: "潮州工夫茶配朥饼" },
          { id: "a20", name: "柿饼" },
          { id: "a21", name: "油索" },
          { id: "a22", name: "蜜饯橄榄" },
          { id: "a23", name: "咸水梅汁" },
          { id: "a24", name: "糖葱薄饼" }
        ],
        dinner: [
          // 原有条目
          { id: "d1", name: "火锅" },
          { id: "d2", name: "北京烤鸭" },
          { id: "d3", name: "水煮鱼" },
          { id: "d4", name: "小龙虾" },
          { id: "d5", name: "干锅牛肉" },
          { id: "d6", name: "酸菜鱼" },
          { id: "d7", name: "铁板牛肉" },
          
          // 新增潮式晚餐
          { id: "d8", name: "潮州生腌蟹" },
          { id: "d9", name: "冻红蟹" },
          { id: "d10", name: "鱼饭（冻鱼）" },
          { id: "d11", name: "砂锅粥" },
          { id: "d12", name: "潮州牛肉火锅" },
          { id: "d13", name: "酸甜咕噜肉" },
          { id: "d14", name: "豆酱煮乌鱼" },
          { id: "d15", name: "菜脯焖鳗鱼" },
          { id: "d16", name: "潮州粉果煲" },
          { id: "d17", name: "金不换炒薄壳" },
          { id: "d18", name: "胡椒猪肚汤" },
          { id: "d19", name: "方鱼炒芥兰" },
          { id: "d20", name: "潮式炒面线" },
          { id: "d21", name: "卤水拼盘" },
          { id: "d22", name: "芡实芋头煲" },
          { id: "d23", name: "咸菜炖白鳝" },
          { id: "d24", name: "潮州豆干煲" },
          { id: "d25", name: "香煎蚝仔烙" },
          { id: "d26", name: "梅膏蒸鳗鱼" },
          { id: "d27", name: "麻叶炒普宁豆酱" }
        ],
        supper: [
          { id: "s1", name: "潮州砂锅粥（虾蟹粥）" },
          { id: "s2", name: "粿条汤（猪杂/海鲜）" },
          { id: "s3", name: "鱼饺汤" },
          { id: "s4", name: "炒糕粿" },
          { id: "s5", name: "鱼虾生" },
          { id: "s6", name: "菜脯鱼头粥" },
          { id: "s7", name: "潮式炒田螺" },
          { id: "s8", name: "麻叶炒豆酱" },
          { id: "s9", name: "生腌血蚶" },
          { id: "s10", name: "蚝仔烙（夜宵版）" },
          { id: "s11", name: "凤凰炸豆腐" },
          { id: "s12", name: "咸菜猪杂汤" },
          { id: "s13", name: "普宁豆干煲" },
          { id: "s14", name: "潮州牛肉丸粿条" },
          { id: "s15", name: "金不换炒薄壳（夜宵版）" },
          { id: "s16", name: "麻油沙茶拌面" },
          { id: "s17", name: "鱼饭配豆酱" },
          { id: "s18", name: "猪肠糯米汤" },
          { id: "s19", name: "潮式烧烤（鳗鱼、豆腐鱼）" },
          { id: "s20", name: "虾枣汤" },
          { id: "s21", name: "腌蟹钳" },
          { id: "s22", name: "鸭母捻甜汤" },
          { id: "s23", name: "返沙双色（芋头/番薯）" },
          { id: "s24", name: "潮州鱼皮饺" },
          { id: "s25", name: "腐乳炒通菜" },
          { id: "s26", name: "椒盐九肚鱼" },
          { id: "s27", name: "姜薯甜蛋汤" },
          { id: "s28", name: "潮式甘草水果" },
          { id: "s29", name: "老药桔炖汤" },
          { id: "s30", name: "沙茶粿条" }
        ]
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
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="breakfast">早餐</TabsTrigger>
          <TabsTrigger value="lunch">中餐</TabsTrigger>
          <TabsTrigger value="afternoonTea">下午茶</TabsTrigger>
          <TabsTrigger value="dinner">晚餐</TabsTrigger>
          <TabsTrigger value="supper">夜宵</TabsTrigger>
        </TabsList>

        {Object.entries(foods).map(([category, foodItems]) => (
          <TabsContent key={category} value={category} className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {category === "breakfast" && "早餐"}
                {category === "lunch" && "中餐"}
                {category === "afternoonTea" && "下午茶"}
                {category === "dinner" && "晚餐"}
                {category === "supper" && "夜宵"}
              </h2>
              <Button variant="outline" size="sm" onClick={() => setShowAddForm(true)}>
                <Plus className="h-4 w-4 mr-1" />
                无我爱个
              </Button>
            </div>

            <div className="h-96 border rounded-lg p-4 overflow-hidden relative">
              {foodItems.length === 0 ? (
                <div className="flex h-full items-center justify-center text-slate-400">
                  无好食。点击"无我爱个"按钮添加一些！
                </div>
              ) : (
                <div className="space-y-2 overflow-y-auto h-full">
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
              {selectedFood ? "我迈！！重Roll" : "Roll！！"}
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

