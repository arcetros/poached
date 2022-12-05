import { validate } from "jsonschema"

import schema from "./schema.json"

export default function validateRecipe(recipe: any) {
  const res = validate(recipe, schema)
  if (!res.valid) {
    throw new Error("No recipe found on page")
  }
  return recipe
}
