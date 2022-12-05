import React from "react"

import { extractNumbers } from "@/helpers/extractNumbers"

const LayoutNutrients: React.FunctionComponent<{
  label: string
  data?: string
  children?: React.ReactNode
}> = ({ label, data, children }) => {
  return (
    <div className="rounded-full bg-gray-100 py-2 px-2">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-[hsl(144,37%,49%)]">
        {extractNumbers(data)}
        {children}
      </div>
      <dt className="pt-2 pb-4 text-center text-sm text-gray-600">{label}</dt>
    </div>
  )
}

export default LayoutNutrients
