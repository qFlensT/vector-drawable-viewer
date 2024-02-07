import React, { ReactElement, HTMLAttributes } from "react";
import { ImageCardProps } from "./image-card";
import { cn } from "../../../shared/lib/utils/cn";

export type ImageCardListProps = {
  cards: ReactElement<ImageCardProps>[];
} & HTMLAttributes<HTMLUListElement>;

export const ImageCardList = ({
  cards,
  className,
  ...props
}: ImageCardListProps) => {
  return (
    <ul
      className={cn(
        "flex w-full flex-wrap place-content-around gap-4",
        className,
      )}
      {...props}
    >
      {cards.map((card, i) => (
        <li key={i}>{React.cloneElement(card, { as: "li" })}</li>
      ))}
    </ul>
  );
};
