import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock"
import React from "react"

import s from "./Sidebar.module.css"

interface SidebarProps {
  children: React.ReactNode
  onClose(): void
}

const Sidebar: React.FunctionComponent<SidebarProps> = ({ children, onClose }) => {
  const sidebarRef = React.useRef() as React.MutableRefObject<HTMLDivElement>
  const contentRef = React.useRef() as React.MutableRefObject<HTMLDivElement>

  const onKeyDownSidebar = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.code === "Escape") {
      onClose()
    }
  }

  React.useEffect(() => {
    if (sidebarRef.current) {
      sidebarRef.current.focus()
    }

    const contentElement = contentRef.current

    if (contentElement) {
      disableBodyScroll(contentElement, { reserveScrollBarGap: true })
    }

    return () => {
      clearAllBodyScrollLocks()
    }
  }, [])

  return (
    <div className={s.root} ref={sidebarRef} onKeyDown={onKeyDownSidebar} tabIndex={1}>
      <div className="absolute inset-0 overflow-hidden">
        <div className={s.backdrop} onClick={onClose} />
        <section className="absolute inset-y-0 right-0 flex w-full max-w-full outline-none md:w-auto md:pl-10">
          <div className="h-full w-full md:w-screen md:max-w-md">
            <div className={s.sidebar} ref={contentRef}>
              {children}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Sidebar
