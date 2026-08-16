import * as React from "react";
import { appBar } from "@seed-design/css/recipes/app-bar";
import { appBarMain } from "@seed-design/css/recipes/app-bar-main";
import {
  IconChevronLeftLine,
  IconXmarkLine,
  IconChevronDownLine,
} from "@karrotmarket/react-monochrome-icon";
import { NotificationBadge, NotificationBadgePositioner } from "./notification-badge";

export interface TopNavigationProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "root" | "standard";
  theme?: "cupertino" | "android";
  tone?: "layer" | "transparent";
}

export function TopNavigation({
  variant = "standard",
  theme = "cupertino",
  tone = "layer",
  className,
  style,
  children,
  ...props
}: TopNavigationProps) {
  const styles = appBar({ theme, tone });

  return (
    <header
      className={`${styles.root} ${className || ""}`}
      style={{
        position: "relative",
        top: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: theme === "android" ? "var(--seed-dimension-x14)" : "var(--seed-dimension-x11)",
        padding: "0 var(--seed-dimension-x3)",
        backgroundColor: tone === "transparent" ? "transparent" : "var(--seed-color-bg-layer-default)",
        borderBottom: tone === "transparent" ? "none" : "1px solid var(--seed-color-stroke-neutral-weak)",
        boxSizing: "border-box",
        ...style,
      }}
      {...props}
    >
      {children}
    </header>
  );
}

export interface TopNavigationLeftProps extends React.HTMLAttributes<HTMLDivElement> {}

export function TopNavigationLeft({ className, style, children, ...props }: TopNavigationLeftProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--seed-dimension-x1)",
        minWidth: "var(--seed-dimension-x9)",
        flexShrink: 0,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export interface TopNavigationTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  onClickTitle?: () => void;
}

export function TopNavigationTitle({
  title,
  subtitle,
  align = "center",
  onClickTitle,
  className,
  style,
  children,
  ...props
}: TopNavigationTitleProps) {
  const mainStyles = appBarMain({ layout: subtitle ? "withSubtitle" : "titleOnly", theme: "cupertino" });

  return (
    <div
      className={mainStyles.root}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: align === "center" ? "center" : "flex-start",
        justifyContent: "center",
        flex: 1,
        minWidth: 0,
        textAlign: align === "center" ? "center" : "left",
        padding: "0 var(--seed-dimension-x2)",
        overflow: "hidden",
        ...style,
      }}
      {...props}
    >
      {children ? (
        children
      ) : onClickTitle ? (
        <button
          type="button"
          onClick={onClickTitle}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "var(--seed-dimension-x1)",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            padding: "var(--seed-dimension-x1) var(--seed-dimension-x2)",
            borderRadius: "var(--seed-dimension-x2)",
            color: "var(--seed-color-fg-neutral)",
          }}
        >
          <span style={{ fontSize: "var(--seed-font-size-t4)", fontWeight: "var(--seed-font-weight-bold)" }}>
            {title}
          </span>
          <IconChevronDownLine style={{ width: "var(--seed-dimension-x4)", height: "var(--seed-dimension-x4)" }} />
        </button>
      ) : (
        <>
          {title && (
            <span
              className={mainStyles.title}
              style={{
                fontSize: "var(--seed-font-size-t4)",
                fontWeight: "var(--seed-font-weight-bold)",
                color: "var(--seed-color-fg-neutral)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "100%",
              }}
            >
              {title}
            </span>
          )}
          {subtitle && (
            <span
              className={mainStyles.subtitle}
              style={{
                fontSize: "var(--seed-font-size-t2)",
                color: "var(--seed-color-fg-neutral-subtle)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "100%",
              }}
            >
              {subtitle}
            </span>
          )}
        </>
      )}
    </div>
  );
}

export interface TopNavigationRightProps extends React.HTMLAttributes<HTMLDivElement> {}

export function TopNavigationRight({ className, style, children, ...props }: TopNavigationRightProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--seed-dimension-x1)",
        minWidth: "var(--seed-dimension-x9)",
        justifyContent: "flex-end",
        flexShrink: 0,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export interface TopNavigationIconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  badge?: React.ReactNode | number;
  badgeSize?: "small" | "large";
}

export function TopNavigationIconButton({
  badge,
  badgeSize = "large",
  ariaLabel,
  children,
  className,
  style,
  ...props
}: TopNavigationIconButtonProps & { "aria-label"?: string }) {
  return (
    <div style={{ position: "relative", display: "inline-flex" }}>
      <button
        type="button"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "var(--seed-dimension-x9)",
          height: "var(--seed-dimension-x9)",
          border: "none",
          background: "transparent",
          cursor: "pointer",
          borderRadius: "var(--seed-dimension-x2)",
          color: "var(--seed-color-fg-neutral)",
          transition: "background var(--seed-duration-d2) var(--seed-timing-function-easing)",
          ...style,
        }}
        {...props}
      >
        {children}
      </button>
      {badge !== undefined && badge !== null && (
        <NotificationBadgePositioner attach="icon" size={badgeSize}>
          <NotificationBadge size={badgeSize}>{badgeSize === "large" ? badge : null}</NotificationBadge>
        </NotificationBadgePositioner>
      )}
    </div>
  );
}

export interface TopNavigationBackButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function TopNavigationBackButton(props: TopNavigationBackButtonProps) {
  return (
    <button
      type="button"
      aria-label="뒤로가기"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "var(--seed-dimension-x9)",
        height: "var(--seed-dimension-x9)",
        border: "none",
        background: "transparent",
        cursor: "pointer",
        borderRadius: "var(--seed-dimension-x2)",
        color: "var(--seed-color-fg-neutral)",
      }}
      {...props}
    >
      <IconChevronLeftLine style={{ width: "var(--seed-dimension-x6)", height: "var(--seed-dimension-x6)" }} />
    </button>
  );
}

export interface TopNavigationCloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function TopNavigationCloseButton(props: TopNavigationCloseButtonProps) {
  return (
    <button
      type="button"
      aria-label="닫기"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "var(--seed-dimension-x9)",
        height: "var(--seed-dimension-x9)",
        border: "none",
        background: "transparent",
        cursor: "pointer",
        borderRadius: "var(--seed-dimension-x2)",
        color: "var(--seed-color-fg-neutral)",
      }}
      {...props}
    >
      <IconXmarkLine style={{ width: "var(--seed-dimension-x6)", height: "var(--seed-dimension-x6)" }} />
    </button>
  );
}
