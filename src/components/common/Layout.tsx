import "@fontsource/inter/300.css"
import "@fontsource/inter/400.css"
import "@fontsource/inter/500.css"
import "@fontsource/inter/700.css"

import React from "react"

// import Header from "./Header"

type Props = {
  children: React.ReactNode
}

const Layout: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <main>
      {/* <Header /> */}
      {children}
    </main>
  )
}

export default Layout
