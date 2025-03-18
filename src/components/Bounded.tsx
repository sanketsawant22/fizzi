import clsx from "clsx";
import React from "react";

type BoundedProps = {
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode; // Made children optional
} & React.HTMLAttributes<HTMLElement>;

export const Bounded = ({
  as: Component = "section",
  className,
  children,
  ...restProps
}: BoundedProps) => {
  // Using JSX.Element directly to avoid the typing issues
  return React.createElement(
    Component,
    {
      className: clsx("px-4 first:pt-10 md:px-6", className),
      ...restProps,
    },
    React.createElement(
      "div",
      { className: "mx-auto flex w-full max-w-7xl flex-col items-center" },
      children
    )
  );
};