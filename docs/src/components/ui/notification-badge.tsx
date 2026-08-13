/**
 * @file ui:notification-badge
 * @requires @seed-design/react@^2.0.0
 * @requires @seed-design/css@^2.0.0
 **/

import {
  NotificationBadge as SeedNotificationBadge,
  NotificationBadgePositioner as SeedNotificationBadgePositioner,
  type NotificationBadgeProps as SeedNotificationBadgeProps,
  type NotificationBadgePositionerProps as SeedNotificationBadgePositionerProps,
} from "@seed-design/react";
import * as React from "react";

export interface NotificationBadgeProps extends SeedNotificationBadgeProps {}

/**
 * @see https://seed-design.io/components/notification-badge
 */
export const NotificationBadge = React.forwardRef<HTMLSpanElement, NotificationBadgeProps>(
  ({ children, ...props }, ref) => {
    return (
      <SeedNotificationBadge ref={ref} {...props}>
        {children}
      </SeedNotificationBadge>
    );
  },
);
NotificationBadge.displayName = "NotificationBadge";

export interface NotificationBadgePositionerProps extends SeedNotificationBadgePositionerProps {}

/**
 * @see https://seed-design.io/components/notification-badge
 */
export const NotificationBadgePositioner = React.forwardRef<
  HTMLSpanElement,
  NotificationBadgePositionerProps
>(({ children, ...props }, ref) => {
  return (
    <SeedNotificationBadgePositioner ref={ref} {...props}>
      {children}
    </SeedNotificationBadgePositioner>
  );
});
NotificationBadgePositioner.displayName = "NotificationBadgePositioner";
