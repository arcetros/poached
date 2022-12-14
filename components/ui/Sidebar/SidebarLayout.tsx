import clsx from "clsx"
import React from "react"
import { MdOutlineClose } from "react-icons/md"

type SidebarLayoutProps = { className?: string; children?: React.ReactNode } & ({ handleClose: () => any } | { handleClose?: never })

const SidebarLayout: React.FunctionComponent<SidebarLayoutProps> = ({ className, children, handleClose }) => {
  return (
    <div className={clsx("relative flex h-full flex-col", className)}>
      <header className="sticky top-0 z-10 box-border flex min-h-[66px] w-full items-center justify-between bg-dark-1 py-4 pl-4 pr-6 lg:min-h-[74px]">
        {handleClose && (
          <button onClick={handleClose} aria-label="Close" className="mr-6 flex items-center transition duration-150 ease-in-out hover:text-neutral-400 focus:outline-none">
            <MdOutlineClose className="h-6 w-6 hover:text-neutral-400" />
            <span className="text-accent-7 ml-2 text-sm ">Close</span>
          </button>
        )}
      </header>
      <div className="box-border flex flex-1 flex-col">{children}</div>
    </div>
  )
}

export default SidebarLayout
