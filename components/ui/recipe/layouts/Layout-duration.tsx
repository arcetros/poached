import clsx from "clsx"
import React from "react"

const LayoutDuration: React.FunctionComponent<{ label: string; data?: string | number }> = ({
  label,
  data
}) => {
  return (
    <div className={clsx("flex flex-col gap-x-1 lg:flex-row", !data && "hidden")}>
      <dt>{label}</dt>
      <dd className="font-bold">{data}</dd>
    </div>
  )
}

export default LayoutDuration
