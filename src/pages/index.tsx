import type { NextPage } from "next"
import React from "react"
import { FiSearch } from "react-icons/fi"

import { Container } from "@/components/ui"

const Home: NextPage = () => {
  return (
    <Container className="mx-auto flex h-screen flex-col items-center justify-center text-gray-100">
      <div className="flex w-full flex-col items-start justify-start md:mx-auto lg:items-center lg:justify-center">
        <h2 className="text-sm font-light text-gray-300 md:text-base">
          Get started with carpe-retractum
        </h2>
        <h1 className="mt-2 text-2xl font-bold md:text-4xl">What are you looking up-to?</h1>
      </div>
      <div className="relative mx-auto mt-8 inline-flex h-12 w-full rounded-3xl bg-dark-2 lg:w-[75%]">
        <FiSearch className="absolute left-5 top-1/2 hidden h-4 w-4 -translate-y-1/2 md:block" />
        <input
          type="text"
          className="h-full w-[calc(100%-75px)] rounded-3xl bg-transparent pl-4 text-sm focus:outline-none md:w-[calc(100%-120px)] md:pl-12"
          placeholder="https://example.com/creamy-courgette-potato-bake"
        />
        <button className="absolute right-1 top-1/2 -translate-y-1/2 rounded-3xl bg-[#48bc873a] py-2.5 px-2.5 text-sm text-black transition duration-200 ease-out hover:bg-[#66ffba3a] md:px-6">
          <span className="hidden text-[#61d09e] md:block">Search</span>
          <FiSearch className="block h-4 w-4 text-[#61d09e] md:hidden" />
        </button>
      </div>
    </Container>
  )
}

export default Home
