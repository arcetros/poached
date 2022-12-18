import clsx from "clsx";
import React from "react";

interface Props extends React.ComponentPropsWithoutRef<"textarea"> {
  className?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, Props>(({ className = "", ...rest }, ref) => {
  return (
    <div className="relative flex h-full w-full flex-col rounded-md bg-dark-2">
      <textarea {...rest} className={clsx("h-full w-full resize-none overflow-auto rounded-md bg-transparent p-2 text-sm focus:outline-none", className)} ref={ref} />
    </div>
  );
});

Textarea.displayName = "Textarea";

export default Textarea;
