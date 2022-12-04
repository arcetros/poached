import "cross-fetch/polyfill"

import getRecipeData from "scrape-recipe-schema"

import { RootSchema } from "@/types"

import { microdata } from "../__mocks__/microdata"

describe("getRecipeData", () => {
  const setup = (data: any) => {
    return async () => {
      const html = await fetch(data.url)

      if (!html) {
        expect(true)
      } else {
        const actualRecipe = await getRecipeData({ html: await html.text() })
        expect(data.expectedData).toMatchObject(actualRecipe.data as RootSchema)
      }
    }
  }

  microdata.tests.forEach((test) => {
    it(`should fetch the expected recipe (${test.url})`, setup(test))
  })
})
