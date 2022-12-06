import "cross-fetch/polyfill"

import { eatingwell } from "../__mocks__/eatingwell"
import { eatingwell as generate } from "../alternative-scrapers"

describe("eatingwell", () => {
  it("should fetch the expected recipe (eatingwell)", async () => {
    const checkServerResponse = await fetch(eatingwell.url)
    expect(eatingwell.expectedData).toMatchObject(generate(await checkServerResponse.text()))
  })

  it("should throw an error if invalid url entered", async () => {
    const checkServerResponse = await fetch(eatingwell.invalidUrl)
    try {
      generate(await checkServerResponse.text())
    } catch (error: any) {
      expect(error.message).toEqual("No recipe found on page")
    }
  })
})
