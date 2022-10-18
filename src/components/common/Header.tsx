import React from "react"

import { Container } from "../ui"

const Header: React.FunctionComponent = () => {
  return (
    <nav className="fixed top-0 z-50 w-full [@supports(backdrop-filter:blur(0))]:backdrop-blur">
      <Container clean className="py-8 px-4 md:px-2 lg:px-8">
        <span
          className="animate-text bg-gradient-to-r from-green-500 via-yellow-200  to-green-500 
            bg-clip-text text-xl font-bold
            text-transparent"
        >
          c
        </span>
        arpe
        <span
          className="animate-text bg-gradient-to-r from-green-500 via-yellow-200  to-green-500 
            bg-clip-text text-xl font-bold
            text-transparent"
        >
          {" "}
          r
        </span>
        etractum
      </Container>
    </nav>
  )
}

export default Header
