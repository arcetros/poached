import React from "react"

import s from "./LoadingDots.module.css"

const LoadingDots: React.FC = () => {
  return (
    <span data-testid="loadingdots" className={s.root}>
      <span className={s.dot} key={`dot_1`} />
      <span className={s.dot} key={`dot_2`} />
      <span className={s.dot} key={`dot_3`} />
    </span>
  )
}

export default LoadingDots
