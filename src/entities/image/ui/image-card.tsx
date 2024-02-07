import {
  ElementType,
  HTMLAttributes,
  ImgHTMLAttributes,
  ReactNode,
} from "react";
import UiCard from "../../../shared/ui/ui-card";
import { cn } from "../../../shared/lib/utils/cn";

export type ImageCardProps = {
  as?: ElementType;
  src: string;
  alt: string;
  headerContent?: ReactNode;
  footerContent?: ReactNode;
  imageProps?: ImgHTMLAttributes<HTMLImageElement>;
} & HTMLAttributes<HTMLElement>;

export const ImageCard = ({
  as = "div",
  src,
  alt,
  headerContent,
  footerContent: footerText,
  imageProps,
  className,
  ...props
}: ImageCardProps) => {
  return (
    <UiCard as={as} className={cn("", className)} {...props}>
      {!!headerContent && <UiCard.Header>{headerContent}</UiCard.Header>}
      <UiCard.Content>
        <img
          src={src}
          alt={alt}
          className="h-full rounded object-cover"
          {...imageProps}
        />
      </UiCard.Content>
      {!!footerText && <UiCard.Footer>{footerText}</UiCard.Footer>}
    </UiCard>
  );
};
