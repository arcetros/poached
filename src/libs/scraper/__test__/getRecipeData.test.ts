import "cross-fetch/polyfill"

import { jsonLd } from "../__mocks__/jsonLd"
import getRecipeData from "../getRecipeData"

describe("getRecipeData", () => {
  const setup = (data: any) => {
    return async () => {
      const checkServerResponse = await fetch(data.url)

      if (!checkServerResponse) {
        expect(true)
      } else {
        const actualRecipe = getRecipeData(await checkServerResponse.text())
        expect(data.expectedData).toMatchObject(actualRecipe)
      }
    }
  }

  jsonLd.tests.forEach((test) => {
    it(`should fetch the expected recipe (${test.url})`, setup(test))
  })
})
