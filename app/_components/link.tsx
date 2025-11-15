import clsx from "clsx";
import { ReactNode } from "react";
import { default as NextLink } from "next/link";

interface LinkProps {
  link?: string;
  isExternalLink?: boolean;
  children: ReactNode;
  hideStyles?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Link = ({
  children,
  hideStyles = false,
  link,
  isExternalLink = false,
  className,
  onClick,
}: LinkProps) => {
  if (!link) return children;

  return isExternalLink ? (
    <a
      href={link}
      className={clsx(
        "text-white underline text-base",
        className && className,
        hideStyles && "no-underline!"
      )}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
    >
      {children}
    </a>
  ) : (
    <NextLink
      href={link}
      className={clsx(
        "text-white underline text-base",
        className && className,
        hideStyles && "no-underline!"
      )}
      onClick={onClick}
    >
      {children}
    </NextLink>
  );
};
