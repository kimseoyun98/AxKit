/**
 * @file ui:content-placeholder
 * @requires @seed-design/react@^2.0.0
 * @requires @seed-design/css@^2.0.0
 **/

import IconPictureFill from "@karrotmarket/react-monochrome-icon/IconPictureFill";
import { ContentPlaceholder as SeedContentPlaceholder } from "@seed-design/react";
import * as React from "react";

export interface ContentPlaceholderProps extends SeedContentPlaceholder.RootProps {}

/**
 * @see https://seed-design.io/react/components/content-placeholder
 */
export const ContentPlaceholder = React.forwardRef<HTMLDivElement, ContentPlaceholderProps>(
  ({ children, type = "default", ...props }, ref) => {
    // If type is "default" and no custom children provided, use clean generic image icon fallback
    const content = children || (type === "default" ? <IconPictureFill /> : undefined);

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
