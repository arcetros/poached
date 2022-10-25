import { validate } from "jsonschema"

import schema from "./schema.json"

function defaultError() {
  throw new Error("No recipe found on page")
}

export default function validateRecipe(recipe: any) {
  const res = validate(recipe, schema)
  if (!res.valid) {
    defaultError()
  }
  return recipe
}
