import { ReactNode, ElementType, HTMLAttributes } from "react";
import { cn } from "../lib/utils/cn";

export type UiCardProps = {
  as?: ElementType;
  children?: ReactNode;
} & HTMLAttributes<HTMLElement>;
const UiCard = ({
  as: Component = "div",
  children,
  className,
  ...props
}: UiCardProps) => {
  return (
    <Component
      className={cn(
        "flex aspect-square max-w-64 flex-col rounded bg-gray-700/60 text-slate-100",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

UiCard.Header = ({
  children,
  className,
  ...props
}: { children?: ReactNode } & HTMLAttributes<HTMLElement>) => (
  <header className={cn("bg-gray-800/40 px-2 py-1", className)} {...props}>
    {children}
  </header>
);

UiCard.Content = ({
  children,
  className,
  ...props
}: { children?: ReactNode } & HTMLAttributes<HTMLElement>) => (
  <div className={cn("flex-grow p-2 text-slate-400", className)} {...props}>
    {children}
  </div>
);

UiCard.Footer = ({
  children,
  className,
  ...props
}: { children?: ReactNode } & HTMLAttributes<HTMLElement>) => (
  <footer
    className={cn("border-t-2 border-gray-800 px-2 py-1 text-xs", className)}
    {...props}
  >
    {children}
  </footer>
);
export default UiCard;
