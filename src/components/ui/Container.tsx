import cn from "clsx"
import React from "react"

interface Props {
  className?: string
  children?: any
  el?: HTMLElement | any
  clean?: boolean
}

const Container: React.FunctionComponent<Props> = ({
  children,
  className,
  el = "div",
  clean = false
}) => {
  const rootClassName = cn(className, {
    "mx-auto max-w-[760px] w-full": !clean
  })

  const Component: React.ComponentType<React.HTMLAttributes<HTMLElement>> = el as any

  return <Component className={rootClassName}>{children}</Component>
}

export default Container
