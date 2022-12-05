import { RootSchema } from "@/types"

export function Recipe(this: RootSchema) {
  this.name = ""
  this.image = ""
  this.description = ""
  this.recipeIngredients = []
  this.recipeInstructions = []
  this.cookTime = ""
  this.prepTime = ""
  this.totalTime = ""
  this.cookTimeOriginalFormat = ""
  this.prepTimeOriginalFormat = ""
  this.totalTimeOriginalFormat = ""
  this.recipeYield = undefined
  this.recipeCategories = []
  this.recipeCuisines = []
  this.recipeTypes = []
}
