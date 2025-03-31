"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { FoodCategory } from "@/lib/types"

interface AddFoodFormProps {
  onAdd: (category: FoodCategory, name: string) => void
  onCancel: () => void
  currentCategory: FoodCategory
}

export default function AddFoodForm({ onAdd, onCancel, currentCategory }: AddFoodFormProps) {
  const [category, setCategory] = useState<FoodCategory>(currentCategory)
  const [name, setName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onAdd(category, name.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">无我爱个</h2>

      <div className="space-y-2">
        <Label htmlFor="food-name">食物名称</Label>
        <Input
          id="food-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="输入食物名称"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>分类</Label>
        <RadioGroup
          value={category}
          onValueChange={(value) => setCategory(value as FoodCategory)}
          className="grid grid-cols-2 gap-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="breakfast" id="breakfast" />
            <Label htmlFor="breakfast">早餐</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="lunch" id="lunch" />
            <Label htmlFor="lunch">中餐</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="afternoonTea" id="afternoonTea" />
            <Label htmlFor="afternoonTea">下午茶</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="dinner" id="dinner" />
            <Label htmlFor="dinner">晚餐</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex justify-end space-x-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          取消
        </Button>
        <Button type="submit" disabled={!name.trim()}>
          添加
        </Button>
      </div>
    </form>
  )
}

