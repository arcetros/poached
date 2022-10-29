import React from "react"
import { AiOutlineFork, AiOutlineStar } from "react-icons/ai"
import { FiSearch } from "react-icons/fi"

import LoadingDots from "../ui/Loading-dots/LoadingDots"
import type { Stats } from "./types"

type Props = {
  stats: Stats
  handleSubmitForm: (event: React.FormEvent) => Promise<void>
  setValue: (value: React.SetStateAction<string>) => void
  value: string
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
    <header>
      <div className="flex flex-col items-start justify-between lg:flex-row   lg:items-center">
        <h1 className="text-2xl font-bold md:text-4xl">poached</h1>
        <div className="mt-1 flex space-x-3 lg:mt-0 lg:ml-3">
          <a
            href={stats.origin}
            target="_blank"
            className="flex items-center gap-x-1 py-1.5"
            rel="noreferrer"
          >
            <AiOutlineStar className="h-5 w-5" />
            {stats.starGazer}
          </a>
          <a
            href={stats.forkUrl}
            target="_blank"
            className="flex items-center gap-x-1 rounded-2xl px-2 py-1.5"
            rel="noreferrer"
          >
            <AiOutlineFork className="h-5 w-5" />
            <span className="text-sm text-[hsl(144,40%,36%)]">Fork</span>
          </a>
        </div>
      </div>
      <h2 className="mt-4 text-gray-500 lg:mt-1">
        Generate recipe without clutters from various websites with an ease.
      </h2>
      <form
        onSubmit={handleSubmitForm}
        className="relative mx-auto mt-4 h-12 w-full rounded bg-white outline outline-1 outline-gray-200"
      >
        <FiSearch className="absolute left-5 top-1/2 hidden h-4 w-4 -translate-y-1/2 md:block" />
        <input
          type="text"
          onChange={(event: React.FormEvent<HTMLInputElement>) =>
            setValue(event.currentTarget.value)
          }
          value={value}
          className="h-full w-[calc(100%-75px)] rounded bg-transparent pl-4 text-sm focus:outline-none md:w-[calc(100%-120px)] md:pl-12"
          placeholder="https://example.com/creamy-courgette-potato-bake"
        />
        <button
          className="absolute right-1 top-1/2 -translate-y-1/2 rounded bg-[#8df1a6cf] py-2.5 px-2.5 text-sm text-black transition duration-200 ease-out hover:bg-[#7cd492cf] disabled:cursor-not-allowed md:px-6"
          disabled={isRequested}
        >
          <span className="hidden text-[hsl(144,40%,36%)] md:block">
            {isRequested ? <LoadingDots /> : "Search"}
          </span>
          <FiSearch className="block h-4 w-4 text-[hsl(144,40%,36%)] md:hidden" />
        </button>
      </form>
    </header>
  )
}

export default HomepageHeader
