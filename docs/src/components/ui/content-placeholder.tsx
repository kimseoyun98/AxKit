/**
 * @file ui:content-placeholder
 * @requires @seed-design/react@^2.0.0
 * @requires @seed-design/css@^2.0.0
 **/

import IconDocumentFill from "@karrotmarket/react-monochrome-icon/IconDocumentFill";
import IconDot3HorizontalChatbubbleLeftFill from "@karrotmarket/react-monochrome-icon/IconDot3HorizontalChatbubbleLeftFill";
import IconPersonFill from "@karrotmarket/react-monochrome-icon/IconPersonFill";
import IconPictureFill from "@karrotmarket/react-monochrome-icon/IconPictureFill";
import { ContentPlaceholder as SeedContentPlaceholder } from "@seed-design/react";
import * as React from "react";

export interface ContentPlaceholderProps extends SeedContentPlaceholder.RootProps {
  type?: "default" | "profile" | "image" | "document" | "chat" | string;
}

const defaultIcons: Record<string, React.ReactNode> = {
  profile: <IconPersonFill />,
  image: <IconPictureFill />,
  document: <IconDocumentFill />,
  chat: <IconDot3HorizontalChatbubbleLeftFill />,
};

/**
 * @see https://seed-design.io/react/components/content-placeholder
 */
export const ContentPlaceholder = React.forwardRef<HTMLDivElement, ContentPlaceholderProps>(
  ({ children, type, ...props }, ref) => {
    const icon = children || (type && defaultIcons[type] ? defaultIcons[type] : <IconPictureFill />);
    return (
      <SeedContentPlaceholder.Root type={type} {...props} ref={ref}>
        <SeedContentPlaceholder.Asset>{icon}</SeedContentPlaceholder.Asset>
      </SeedContentPlaceholder.Root>
    );
  },
);
ContentPlaceholder.displayName = "ContentPlaceholder";

/**
 * This file is a snippet from SEED Design, helping you get started quickly with @seed-design/* packages.
 * You can extend this snippet however you want.
 */
