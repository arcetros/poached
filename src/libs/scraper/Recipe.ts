export type RecipeProps = {
  name: string
  description?: string
  ingredients?: string[]
  instructions: string[]
  time: {
    prep?: string | number
    cook?: string | number
    active?: string | number
    inactive?: string | number
    ready?: string | number
    total?: string | number
  }
  nutritions?: any
  servings?: string | number
  author?: string
  image?: string
}

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
  this.nutritions = undefined
  this.servings = "" || "1"
  this.author = "" || undefined
  this.image = "" || undefined
}
