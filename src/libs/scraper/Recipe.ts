import { RecipeProps } from "@/types"

export function Recipe(this: RecipeProps) {
  this.name = ""
  this.description = "" || undefined
  this.ingredients = []
  this.instructions = []
  this.time = {
    prep: "" || undefined,
    cook: "" || undefined,
    active: "" || undefined,
    inactive: "" || undefined,
    ready: "" || undefined,
    total: "" || undefined
  }
  this.nutritions = {
    calories: "" || undefined,
    proteinContent: "" || undefined,
    carbohydrateContent: "" || undefined,
    fatContent: "" || undefined,
    fiberContent: "" || undefined,
    sugarContent: "" || undefined
  }
  this.servings = "" || "1"
  this.author = "" || undefined
  this.image = "" || undefined
}
