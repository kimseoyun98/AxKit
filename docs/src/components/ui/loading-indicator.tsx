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
    { children, size = "24", tone = "neutral", ...otherProps },
    ref,
  ) => {
    return (
      <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--seed-dimension-x2)" }}>
        <ProgressCircle ref={ref} size={size as any} tone={tone as any} isIndeterminate {...otherProps} />
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
