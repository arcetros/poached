import cn from "clsx"
import React from "react"

interface Props {
  className?: string
  children?: any
  el?: HTMLElement | any
  clean?: boolean
}

const Container: React.FunctionComponent<Props> = ({ children, className, el = "div", clean = false }) => {
  const rootClassName = cn(className, {
    "max-w-6xl py-8 pb-16 lg:pb-0 lg:py-16 px-4 lg:px-8 w-full": !clean
  })

  const Component: React.ComponentType<React.HTMLAttributes<HTMLElement>> = el as any

  return <Component className={rootClassName}>{children}</Component>
}

export default Container
