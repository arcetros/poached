import React from "react"

export type ModalProps = {
  className?: string
  children?: React.ReactNode
  onClose: () => void
}

const Modal: React.FunctionComponent<ModalProps> = ({ children, onClose }) => {
  const ref = React.useRef() as React.MutableRefObject<HTMLDivElement>
  const handleKey = React.useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        return onClose()
      }
    },
    [onClose]
  )

  React.useEffect(() => {
    const modal = ref.current

    if (modal) {
      window.addEventListener("keydown", handleKey)
    }
    return () => {
      window.removeEventListener("keydown", handleKey)
    }
  }, [handleKey])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="relative w-[20rem] rounded-md bg-dark-1 py-12 px-4" role="dialog" ref={ref}>
        <button
          onClick={() => onClose()}
          aria-label="Close panel"
          className="focus:outline-none; absolute right-0 top-0 m-6 transition duration-150 ease-in-out hover:text-green-300
"
        >
          x
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal
