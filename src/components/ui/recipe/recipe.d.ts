export type Nutrients = {
  calories?: string
  carbohydrateContent?: string
  fatContent?: string
  fiberContent?: string
  proteinContent?: string
  sugarContent?: string
}

export type Recipe = {
  author?: string
  image?: string
  description?: string
  ingredients: string[]
  instructions: string[]
  name: string
  nutritions?: Nutrients
  servings: string | number
  time: { prep: string | number; cook: string | number; total: string | number }
}

export type Result = {
  message: string
  status: boolean
  results: Recipe
  method: string
}

export type RecipeData = {
  data?: Result
  url: string
  isRequested?: boolean
}
