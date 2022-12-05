/* eslint-disable @typescript-eslint/no-var-requires */
import "@testing-library/jest-dom"

import { render } from "@testing-library/react"
import React from "react"

import Home, { getStaticProps } from "@/pages"

const stats = {
  forkUrl: "https://github.com/arcetros/poached/fork"
}

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ stats })
  })
) as jest.Mock

jest.mock("next/dist/client/router", () => require("next-router-mock"))

jest.mock("next/dist/shared/lib/router-context", () => {
  const { createContext } = require("react")
  const router = require("next-router-mock").default
  const RouterContext = createContext(router)
  return { RouterContext }
})

describe("home", () => {
  it("should renders home page properly", () => {
    const { container } = render(<Home stats={stats} />)

    expect(container.firstChild?.hasChildNodes()).toBeTruthy()
  })
})

describe("getStaticProps", () => {
  it("returns the props correctly", async () => {
    const response = await getStaticProps({} as any)
    expect(response).toEqual({
      props: {
        stats: stats
      },
      revalidate: 10
    })
  })
})
