import "cross-fetch/polyfill"

import { allrecipes } from "../__mocks__/allrecipes"
import { allrecipes as generate } from "../alternative-scrapers"

describe("allrecipes", () => {
  it("should fetch the expected recipe (allrecipes)", async () => {
    const checkServerResponse = await fetch(allrecipes.url)
    expect(allrecipes.expectedData).toMatchObject(generate(await checkServerResponse.text()))
  })

  it("should throw an error if invalid url entered", async () => {
    const checkServerResponse = await fetch(allrecipes.invalidUrl)
    try {
      generate(await checkServerResponse.text())
    } catch (error: any) {
      expect(error.message).toEqual("No recipe found on page")
    }
  })
})
