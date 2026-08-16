/**
 * @file ui:loading-indicator
 * @requires @seed-design/react@^2.0.0
 * @requires @seed-design/css@^2.0.0
 **/

import {
  LoadingIndicator as SeedLoadingIndicator,
  type LoadingIndicatorProps as SeedLoadingIndicatorProps,
} from "@seed-design/react";
import * as React from "react";
import { ProgressCircle } from "./progress-circle";

export interface LoadingIndicatorProps extends Omit<SeedLoadingIndicatorProps, "indicator"> {
  indicator?: React.ReactNode;
}

/**
 * @see https://seed-design.io/react/components/loading-indicator
 */
export const LoadingIndicator = React.forwardRef<
  SVGSVGElement,
  LoadingIndicatorProps
>(
  (
    { children, size = "24", tone = "neutral", style, ...otherProps },
    ref,
  ) => {
    const pxSize = typeof size === "number" ? size : parseInt(String(size), 10) || 24;
    const isStandard = size === "16" || size === "24" || size === "40";
    const mappedSize = isStandard ? (size as any) : "24";
    const customStyle = !isStandard
      ? { width: pxSize, height: pxSize, minWidth: pxSize, minHeight: pxSize, ...style }
      : style;

    return (
      <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--seed-dimension-x2)" }}>
        <ProgressCircle
          ref={ref}
          size={mappedSize}
          tone={tone as any}
          isIndeterminate
          style={customStyle}
          {...otherProps}
        />
        {children}
      </span>
    );
  },
);
LoadingIndicator.displayName = "LoadingIndicator";

/**
 * This file is a snippet from SEED Design, helping you get started quickly with @seed-design/* packages.
 * You can extend this snippet however you want.
 */
