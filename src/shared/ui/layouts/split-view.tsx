import { MouseEventHandler, ReactNode, useState } from "react";
import { cn } from "../../lib/utils";

export type SplitViewLayoutProps = {
  left: ReactNode;
  right: ReactNode;
  leftMinWidth?: number;
  className?: string;
};

export const SplitViewLayout = ({
  className,
  left,
  right,
  leftMinWidth = 150,
}: SplitViewLayoutProps) => {
  const [leftWidth, setLeftWidth] = useState(leftMinWidth);

  const startResizing: MouseEventHandler<HTMLDivElement> = (mouseDownEvent) => {
    const startX = mouseDownEvent.clientX;
    const startWidth = leftWidth;

    const onMouseMove = (mouseMoveEvent: MouseEvent) => {
      const currentX = mouseMoveEvent.clientX;
      const width = startWidth + currentX - startX;
      leftMinWidth <= width && setLeftWidth(width);
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div className={cn("flex h-full", className)}>
      <aside
        className="h-full overflow-x-auto"
        style={{ width: `${leftWidth}px` }}
      >
        {left}
      </aside>
      <div
        onMouseDown={startResizing}
        className="h-full w-1.5 cursor-ew-resize border-r-2 border-gray-700 bg-gray-700/0 transition-colors hover:bg-gray-700 active:bg-gray-700"
      ></div>
      <section className="flex-grow overflow-x-auto">{right}</section>
    </div>
  );
};
