import "@testing-library/jest-dom"

import { render, screen } from "@testing-library/react"
import React from "react"

import HomepageInfo from "../homepage-info"

describe("homepage info", () => {
  const url = "https://github.com/arcetros/poached/issues"
  it("should render correctly and issue link should be shown", () => {
    render(<HomepageInfo />)

    expect(screen.getByRole("link")).toBeVisible()
    expect(screen.getByRole("link")).toHaveAttribute("href", url)
  })
})
