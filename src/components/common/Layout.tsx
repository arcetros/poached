import "@fontsource/inter/300.css"
import "@fontsource/inter/400.css"
import "@fontsource/inter/500.css"
import "@fontsource/inter/700.css"

import React from "react"

import SEO from "./SEO"

type Props = {
  children: React.ReactNode
}

const Layout: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <main className="flex min-h-screen flex-col justify-center">
      <SEO>
        <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1" />
      </SEO>
      {children}
    </main>
  )
}

export default Layout