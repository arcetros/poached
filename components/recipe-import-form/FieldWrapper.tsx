import clsx from "clsx";
import React from "react";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
  el?: HTMLElement | any;
}

const FieldWrapper: React.FunctionComponent<Props> = ({ children, el = "div", ...rest }) => {
  const Component: React.ComponentType<React.HTMLAttributes<HTMLElement>> = el as any;
  return (
    <Component className={clsx("mt-4 flex flex-col", rest.className)}>
      <label className="mb-1 font-primary text-sm text-neutral-400">{rest["aria-label"]}</label>
      {children}
    </Component>
  );
};

export default FieldWrapper;
