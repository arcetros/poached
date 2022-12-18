import clsx from "clsx";
import React from "react";

interface Props extends React.ComponentPropsWithoutRef<"input"> {
  className?: string;
}

const Input = React.forwardRef<HTMLInputElement, Props>(({ className = "", ...rest }, ref) => {
  return (
    <div className="relative flex w-full flex-col rounded-md bg-dark-2">
      <input {...rest} className={clsx("h-10 rounded-md bg-transparent p-2 text-sm focus:outline-none", className)} ref={ref} />
    </div>
  );
});

Input.displayName = "Input";

export default Input;
