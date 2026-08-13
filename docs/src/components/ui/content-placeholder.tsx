/**
 * @file ui:content-placeholder
 * @requires @seed-design/react@^2.0.0
 * @requires @seed-design/css@^2.0.0
 **/

import { ContentPlaceholder as SeedContentPlaceholder } from "@seed-design/react";
import * as React from "react";

export interface ContentPlaceholderProps extends SeedContentPlaceholder.RootProps {}

const defaultImageSvg = (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M51.2 5.33325H12.8C8.66665 5.33325 5.33331 8.66659 5.33331 12.7999V51.1999C5.33331 55.3333 8.66665 58.6666 12.8 58.6666H51.2C55.3333 58.6666 58.6666 55.3333 58.6666 51.1999V12.7999C58.6666 8.66659 55.3333 5.33325 51.2 5.33325ZM42.6666 16.2666C44.88 16.2666 46.6666 18.0533 46.6666 20.2666C46.6666 22.4799 44.88 24.2666 42.6666 24.2666C40.4533 24.2666 38.6666 22.4799 38.6666 20.2666C38.6666 18.0533 40.4533 16.2666 42.6666 16.2666ZM49.8666 45.4399C48.8266 46.4799 47.12 46.4533 46.1066 45.4133L42.4533 41.6799L38.72 45.4399C38.2133 45.9466 37.5466 46.2133 36.8266 46.2133C36.1066 46.2133 35.44 45.9199 34.9333 45.4133L26.48 36.7199L17.9466 45.4399C16.9066 46.4799 15.2266 46.5066 14.1866 45.4666C13.1466 44.4266 13.12 42.7466 14.16 41.6799L24.6133 31.0133C25.12 30.5066 25.8133 30.2133 26.5066 30.2133C27.2266 30.2133 27.92 30.5066 28.4266 31.0133L36.88 39.7333L40.6133 35.9733C41.12 35.4666 41.7866 35.1999 42.5066 35.1999C43.2266 35.1999 43.8933 35.4933 44.4 35.9999L49.9466 41.6533C50.9866 42.6933 50.96 44.3999 49.92 45.4399H49.8666Z"
    />
  </svg>
);

/**
 * @see https://seed-design.io/react/components/content-placeholder
 */
export const ContentPlaceholder = React.forwardRef<HTMLDivElement, ContentPlaceholderProps>(
  ({ children, type = "default", ...props }, ref) => {
    // If type is "default" and no custom children provided, use thick 64x64 image SVG artwork
    const content = children || (type === "default" ? defaultImageSvg : undefined);

    return (
      <SeedContentPlaceholder.Root type={type} {...props} ref={ref}>
        <SeedContentPlaceholder.Asset>{content}</SeedContentPlaceholder.Asset>
      </SeedContentPlaceholder.Root>
    );
  },
);
ContentPlaceholder.displayName = "ContentPlaceholder";

/**
 * This file is a snippet from SEED Design, helping you get started quickly with @seed-design/* packages.
 * You can extend this snippet however you want.
 */
