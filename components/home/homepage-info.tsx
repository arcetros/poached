import React from "react"
import { FiInfo } from "react-icons/fi"

const HomepageInfo: React.FunctionComponent = () => {
  return (
    <div className="mt-auto flex w-full items-start bg-dark-1 px-8 py-8">
      <span className="rounded-full bg-[#4d68ff51] p-3">
        <FiInfo className="h-6 w-6 text-[hsl(226,74%,58%)]" />
      </span>
      <div className="ml-3">
        <b>Information</b>
        <p className="text-sm">
          The website you entered is not supported? open an{" "}
          <a
            href="https://github.com/arcetros/poached/issues"
            target="_blank"
            className="underline"
            rel="noreferrer"
          >
            issue
          </a>{" "}
          and we&apos;ll do our best to add it.
        </p>
      </div>
    </div>
  )
}

export default HomepageInfo
