import clsx from "clsx";
import { HTMLAttributes } from "react";

type BoundedProps = {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
} & HTMLAttributes<HTMLElement>;

export const Bounded = ({
  as: Comp = "section",
  className,
  children,
  ...restProps
}: BoundedProps) => {
  return (
    <Comp
      className={clsx("px-4 first:pt-10 md:px-6", className)}
      {...restProps}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
        {children}
      </div>
    </Comp>
  );
};