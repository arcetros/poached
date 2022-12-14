import { RootSchema } from "@/types"

// export type Nutrients = {
//   calories?: string
//   carbohydrateContent?: string
//   fatContent?: string
//   fiberContent?: string
//   proteinContent?: string
//   sugarContent?: string
// }

export type Result = {
  message: string
  status: boolean
  results: RootSchema
  method: string
}

export type RecipeData = {
  data?: Result
  url?: string
  isRequested?: boolean
}
