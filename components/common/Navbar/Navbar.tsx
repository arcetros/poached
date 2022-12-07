import React from "react"
import { BsGear } from "react-icons/bs"
import {
  FiBook,
  FiCalendar,
  FiChevronDown,
  FiChevronLeft,
  FiGrid,
  FiInfo,
  FiMoon,
  FiSun
} from "react-icons/fi"

const Navbar: React.FunctionComponent = () => {
  return (
    <nav className="flex h-fit w-full flex-col justify-between overflow-auto bg-dark-1 md:sticky md:h-full md:w-[19rem]">
      <section>
        <div className="border-neutral flex items-center justify-between border-b border-r border-dark-neutral py-6 px-5">
          <h1 className="font-headline text-xl font-medium">Poached</h1>
          <div className="rounded-full border border-neutral-700 p-3">
            <FiChevronLeft />
          </div>
        </div>
        <div className="hidden flex-col justify-between py-6 md:flex">
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
        <div className="flex items-center justify-between px-5 pt-6">
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
    </nav>
  )
}

export default Navbar
