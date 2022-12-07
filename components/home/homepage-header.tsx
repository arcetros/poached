import React from "react"
import { FiCornerDownLeft, FiSearch } from "react-icons/fi"

import LoadingDots from "../ui/Loading-dots/LoadingDots"
import type { Stats } from "./types"

type Props = {
  stats: Stats
  handleSubmitForm: (event: React.FormEvent) => Promise<void>
  setValue: (value: React.SetStateAction<string>) => void
  value?: string
  isRequested: boolean
}

const HomepageHeader: React.FunctionComponent<Props> = ({
  stats,
  handleSubmitForm,
  setValue,
  value,
  isRequested
}) => {
  return (
    <header className="relative my-auto inline-flex h-full items-center">
      <form
        onSubmit={handleSubmitForm}
        className="relative h-12 w-[350px] rounded-lg bg-dark-neutral"
      >
        <label htmlFor="urlKeyword" aria-label="urlKeyword">
          <FiSearch className="absolute left-5 top-1/2 hidden h-4 w-4 -translate-y-1/2 md:block" />
        </label>
        <input
          type="text"
          onChange={(event: React.FormEvent<HTMLInputElement>) =>
            setValue(event.currentTarget.value)
          }
          id="urlKeyword"
          autoComplete="off"
          value={value || ""}
          className="h-full rounded-lg bg-transparent pl-4 text-sm focus:outline-none md:w-[calc(100%-75px)] md:pl-12"
          placeholder="Search recipe by url"
        />
        <button
          type="submit"
          id="submitUrl"
          className="absolute right-1 top-1/2 -translate-y-1/2 rounded-lg bg-[#3e3f41] py-2.5 px-1 text-sm transition duration-200 ease-out hover:bg-[#7cd492cf] disabled:cursor-not-allowed disabled:hover:bg-[#3e3f41] md:px-6"
          disabled={!value || isRequested}
        >
          <span className="hidden md:block">
            {isRequested ? <LoadingDots /> : <FiCornerDownLeft className="h-5 w-5" />}
          </span>
          <FiSearch className="block h-4 w-4 text-[hsl(144,40%,36%)] md:hidden" />
        </button>
      </form>
    </header>
  )
}

export default HomepageHeader
