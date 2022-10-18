import type { NextPage } from "next"
import React from "react"
import { FiSearch } from "react-icons/fi"

import { Container } from "@/components/ui"

const Home: NextPage = () => {
  return (
    <Container className="mx-auto flex h-screen flex-col items-center justify-center text-gray-100">
      <div className="mx-auto flex flex-col items-center justify-center">
        <h2 className="text-base font-light text-gray-300">Get started with carpe-retractum</h2>
        <h1 className="mt-2 text-4xl font-bold">What are you looking up-to?</h1>
      </div>
      <div className="relative mt-8 h-12 w-[75%] rounded-3xl bg-dark-2">
        <FiSearch className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2" />
        <input
          type="text"
          className="h-full w-[calc(100%-120px)] rounded-3xl bg-transparent pl-12 focus:outline-none"
          placeholder="Insert any recipe url"
        />
        <div className="absolute right-1 top-1/2 -translate-y-1/2 rounded-3xl bg-[#48bc873a] py-2.5 px-6 text-sm text-black">
          <span className="text-[#61d09e]">Search</span>
        </div>
      </div>
    </Container>
  )
}

export default Home
