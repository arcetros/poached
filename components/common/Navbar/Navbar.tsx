import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock"
import React from "react"
import { BsGear } from "react-icons/bs"
import {
  FiAlignRight,
  FiBook,
  FiCalendar,
  FiChevronDown,
  FiGrid,
  FiInfo,
  FiMoon,
  FiSun
} from "react-icons/fi"

const Navbar: React.FunctionComponent<{ isOpen: boolean; toggleNavBar: () => void }> = ({
  isOpen,
  toggleNavBar
}) => {
  const ref = React.useRef() as React.MutableRefObject<HTMLDivElement>

  React.useEffect(() => {
    const mobileNav = ref.current

    if (mobileNav) {
      disableBodyScroll(mobileNav, { reserveScrollBarGap: true })
    }
    return () => {
      clearAllBodyScrollLocks()
    }
  }, [isOpen])

  return (
    <nav className="relative z-50 flex w-full flex-col justify-between overflow-auto bg-dark-1 md:fixed md:h-full md:w-[15rem]">
      <div className="flex h-full w-full flex-col md:relative md:w-auto md:justify-between">
        <section>
          <div className="border-neutral fixed z-50 flex h-20 w-full items-center justify-between border-b border-r border-dark-neutral bg-dark-1 px-5 md:relative md:w-auto">
            <h1 className="font-headline text-xl font-medium">Poached</h1>
            <div
              onClick={toggleNavBar}
              className="block rounded border border-neutral-700 p-3 md:hidden"
            >
              <FiAlignRight />
            </div>
          </div>
          <div className="hidden flex-col justify-between py-6 md:flex">
            <h5 className="px-5 text-sm text-neutral-500">MENU</h5>
            <ol className="flex flex-col space-y-3 divide-y divide-dark-neutral py-4 px-5">
              <li className="relative flex items-center space-x-3 pt-3">
                <FiGrid className="h-5 w-5" />
                <span className="text-sm">Dashboard</span>
                <div className="absolute left-[-2rem] h-full w-[2px] bg-[hsl(144,40%,36%)]"></div>
              </li>
              <li className="flex items-center space-x-3 pt-3 text-neutral-500">
                <FiBook className="h-5 w-5" />
                <span className="text-sm">Cookbooks</span>
              </li>
              <li className="flex items-center space-x-3 pt-3 text-neutral-500">
                <FiCalendar className="h-5 w-5" />
                <span className="text-sm">Meal Planner</span>
              </li>
            </ol>
          </div>
        </section>
        <section className="hidden flex-col justify-between pb-6 md:flex">
          <h5 className="px-5 text-sm text-neutral-500">GENERAL</h5>
          <ol className="flex flex-col space-y-3 divide-y divide-dark-neutral py-4 px-5">
            <li className="flex items-center space-x-3 pt-3 text-neutral-500">
              <BsGear className="h-5 w-5" />
              <span className="text-sm">Settings</span>
            </li>
            <li className="flex items-center space-x-3 pt-3 text-neutral-500">
              <FiInfo className="h-5 w-5" />
              <span className="text-sm">Support</span>
            </li>
          </ol>
          <div className="px-5 pt-4">
            <div className="flex h-12 w-full rounded-full bg-[#2b2c2e] p-1 text-sm">
              <span className="flex flex-1 items-center justify-center space-x-2 rounded-full bg-[#3e3f41]">
                <FiMoon className="h-4 w-4" />
                <span>Dark</span>
              </span>
              <span className="flex flex-1 items-center justify-center space-x-2 rounded-full text-neutral-500">
                <FiSun className="h-4 w-4" />
                <span>Light</span>
              </span>
            </div>
          </div>
          <div className="hidden items-center justify-between px-5 pt-6 md:flex">
            <div className="flex items-center">
              <div className="h-9 w-9 rounded-full bg-neutral-400"></div>
              <div className="ml-3">
                <strong className="text-sm font-light">John Doe</strong>
                <h1 className="text-xs text-neutral-500">johndoe@gmail.com</h1>
              </div>
            </div>
            <FiChevronDown />
          </div>
        </section>
      </div>
      {isOpen && (
        <>
          <div ref={ref} className="fixed top-[89px] z-50 w-full bg-dark-1 md:hidden">
            <div className="flex-col justify-between py-6 md:flex">
              <h5 className="px-5 text-sm text-neutral-500">MENU</h5>
              <ol className="flex flex-col space-y-3 divide-y divide-dark-neutral py-4 px-5">
                <li className="relative flex items-center space-x-3 pt-3">
                  <FiGrid className="h-5 w-5" />
                  <span className="text-sm">Dashboard</span>
                  <div className="absolute left-[-2rem] h-full w-[2px] bg-blue-500"></div>
                </li>
                <li className="flex items-center space-x-3 pt-3 text-neutral-500">
                  <FiBook className="h-5 w-5" />
                  <span className="text-sm">Cookbooks</span>
                </li>
                <li className="flex items-center space-x-3 pt-3 text-neutral-500">
                  <FiCalendar className="h-5 w-5" />
                  <span className="text-sm">Meal Planner</span>
                </li>
              </ol>
            </div>
            <section className="flex flex-col justify-between pb-6 md:hidden">
              <h5 className="px-5 text-sm text-neutral-500">GENERAL</h5>
              <ol className="flex flex-col space-y-3 divide-y divide-dark-neutral py-4 px-5">
                <li className="flex items-center space-x-3 pt-3 text-neutral-500">
                  <BsGear className="h-5 w-5" />
                  <span className="text-sm">Settings</span>
                </li>
                <li className="flex items-center space-x-3 pt-3 text-neutral-500">
                  <FiInfo className="h-5 w-5" />
                  <span className="text-sm">Support</span>
                </li>
              </ol>
              <div className="px-5 pt-4">
                <div className="flex h-12 w-full rounded-full bg-[#2b2c2e] p-1 text-sm">
                  <span className="flex flex-1 items-center justify-center space-x-2 rounded-full bg-[#3e3f41]">
                    <FiMoon className="h-4 w-4" />
                    <span>Dark</span>
                  </span>
                  <span className="flex flex-1 items-center justify-center space-x-2 rounded-full text-neutral-500">
                    <FiSun className="h-4 w-4" />
                    <span>Light</span>
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between px-5 pt-6 md:hidden">
                <div className="flex items-center">
                  <div className="h-9 w-9 rounded-full bg-neutral-400"></div>
                  <div className="ml-3">
                    <strong className="text-sm font-light">John Doe</strong>
                    <h1 className="text-xs text-neutral-500">johndoe@gmail.com</h1>
                  </div>
                </div>
                <FiChevronDown />
              </div>
            </section>
          </div>
          <div
            className="fixed z-40 h-full w-full bg-dark-1 bg-opacity-80"
            onClick={toggleNavBar}
          ></div>
        </>
      )}
    </nav>
  )
}

export default Navbar
