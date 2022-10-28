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
  nutritions: {
    calories?: string
    proteinContent?: string
    carbohydrateContent?: string
    fatContent?: string
    fiberContent?: string
    sugarContent?: string
  }
  servings?: string | number
  author?: string
  image?: string
}
