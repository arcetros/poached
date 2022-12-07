import React from "react"

import Navbar from "./Navbar/Navbar"
import SEO from "./SEO"

type Props = {
  children: React.ReactNode
}

const Layout: React.FunctionComponent<Props> = ({ children }) => {
  const [isNavbarOpen, setIsNavbarOpen] = React.useState<boolean>(false)
  const [clientWidth, setClientWidth] = React.useState<number | undefined>(undefined)

  const ref = React.useRef<HTMLDivElement>(null)

  const toggleNavBar = () => setIsNavbarOpen((state) => !state)

  React.useEffect(() => {
    function handleResize() {
      setClientWidth(ref.current?.offsetWidth)
    }
    window.addEventListener("resize", handleResize)

    if (clientWidth && clientWidth > 768) {
      setIsNavbarOpen(false)
    }

    return () => window.removeEventListener("resize", handleResize)
  }, [ref.current?.offsetWidth])

  return (
    <main ref={ref} className="flex h-auto flex-col overflow-hidden md:h-screen md:flex-row">
      <SEO>
        <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1" />
      </SEO>
      <Navbar isOpen={isNavbarOpen} toggleNavBar={toggleNavBar} />
      <div className="w-full overflow-auto pt-[90px] md:pl-[15rem] md:pt-0">{children}</div>
    </main>
  )
}

export default Layout
