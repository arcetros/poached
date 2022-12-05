import "@testing-library/jest-dom"

import { cleanup, render, within } from "@testing-library/react"
import React from "react"

import { RecipeData } from "@/components/ui/recipe/recipe"

import { data } from "../__mocks__/data"
import HomepageRecipe from "../homepage-recipe"

afterEach(cleanup)

describe("homepage recipe", () => {
  const url = "https://stryve.life/recipes/creamy-courgette-potato-bake"
  const setup = (data: RecipeData) => {
    const utils = render(
      <HomepageRecipe isRequested={data.isRequested} data={data.data} url={data.url} />
    )
    return { ...utils }
  }

  it("should not render anything on initial render", () => {
    const { queryByText } = setup({ isRequested: false })
    expect(queryByText(/ingredients/i)).toBeNull()
  })

  it("should render a skeleton layout when requesting", () => {
    const { getByRole } = setup({ isRequested: true, url: url })
    expect(getByRole("article", { name: /recipe-skeleton/i })).toBeVisible()
  })

  it("should render recipe layout with important data", () => {
    const { getByRole, getByText } = setup({ isRequested: false, data: data, url: url })

    const ingredientsList = getByRole("list", { name: /ingredients/i })
    const { getAllByRole: getAllIngredients } = within(ingredientsList)
    const ingredients = getAllIngredients("listitem")

    const instructionsList = getByRole("list", { name: /instructions/i })
    const { getAllByRole: getAllInstructions } = within(instructionsList)
    const instructions = getAllInstructions("listitem")

    expect(getByRole("article", { name: /recipe-data/i })).toBeVisible()
    expect(getByText(data.results.name)).toBeInTheDocument()
    expect(ingredients.length).toBe(Array.from(new Set(data.results.recipeIngredients)).length)
    expect(instructions.length).toBe(data.results.recipeInstructions?.length)
  })

  it("should render undefined component when data is undefined", () => {
    const { getByText } = setup({ isRequested: false, url: url })
    expect(getByText(/oops !/i)).toBeInTheDocument()
  })
})
