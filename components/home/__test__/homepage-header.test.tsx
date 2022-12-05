import "@testing-library/jest-dom"

import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import React from "react"

import { HomepageHeader } from "../index"

const stats = {
  forkUrl: "https://github.com/arcetros/poached/fork"
}

interface Props {
  isRequested: boolean
  value: string
  stats?: any
}

const props: Props = {
  isRequested: false,
  value: "https://stryve.life/recipes/creamy-courgette-potato-bake",
  stats: stats
}

afterEach(cleanup)

describe("homepage header", () => {
  const handleSubmit = jest.fn() as jest.Mock
  const setValue = jest.fn((string) => string) as jest.Mock

  const setup = (data: Props) => {
    const utils = render(
      <HomepageHeader
        isRequested={data.isRequested}
        stats={props.stats}
        handleSubmitForm={handleSubmit}
        setValue={setValue}
        value={data.value}
      />
    )
    const input = utils.getByRole("textbox", { name: /urlKeyword/i }) as HTMLInputElement
    return {
      input,
      ...utils
    }
  }

  it("should render input field correctly with submit button disabled", () => {
    const { input } = setup({ value: "", isRequested: props.isRequested })
    expect(screen.getByRole("button", { name: /Search/i })).toBeDisabled()
    expect(input).toBeVisible()
  })

  it("should enable submit button if value exist", () => {
    const { input } = setup({ value: props.value, isRequested: props.isRequested })
    expect(screen.getByRole("button", { name: /Search/i })).not.toBeDisabled()
    expect(input.value).toEqual(props.value)
  })
  it("should render loading dots when data is requested", () => {
    const { input } = setup({ value: props.value, isRequested: true })
    fireEvent.submit(input)
    expect(screen.getByTestId("loadingdots")).toBeInTheDocument()
  })
})
