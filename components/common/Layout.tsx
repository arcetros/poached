import React from "react"

import Navbar from "./Navbar/Navbar"
import SEO from "./SEO"

type Props = {
  children: React.ReactNode
}

const Layout: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <main className="flex h-auto flex-col overflow-hidden md:h-screen md:flex-row">
      <SEO>
        <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1" />
      </SEO>
      <Navbar />
      <div className="w-full">{children}</div>
    </main>
  )
}

export default Layout
