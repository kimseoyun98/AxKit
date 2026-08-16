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
        width: "100%",
        boxSizing: "border-box",
        backgroundColor: tone === "transparent" ? "transparent" : "var(--seed-color-bg-layer-default)",
        borderBottom: tone === "transparent" ? "none" : "1px solid var(--seed-color-stroke-neutral-weak)",
        ...style,
      }}
      {...props}
    >
      {children}
    </header>
  );
}

export interface TopNavigationLeftProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: "cupertino" | "android";
  tone?: "layer" | "transparent";
}

export function TopNavigationLeft({
  theme = "cupertino",
  tone = "layer",
  className,
  style,
  children,
  ...props
}: TopNavigationLeftProps) {
  const styles = appBar({ theme, tone });

  return (
    <div
      className={`${styles.left} ${className || ""}`}
      style={{
        flexShrink: 0,
        zIndex: 1,
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
  theme?: "cupertino" | "android";
  tone?: "layer" | "transparent";
  onClickTitle?: () => void;
}

export function TopNavigationTitle({
  title,
  subtitle,
  align = "center",
  theme = "cupertino",
  tone = "layer",
  onClickTitle,
  className,
  style,
  children,
  ...props
}: TopNavigationTitleProps) {
  const mainStyles = appBarMain({
    layout: subtitle ? "withSubtitle" : "titleOnly",
    theme,
    tone,
  });

  return (
    <div
      className={`${mainStyles.root} ${className || ""}`}
      style={{
        pointerEvents: onClickTitle ? "auto" : undefined,
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
            pointerEvents: "auto",
          }}
        >
          <span className={mainStyles.title}>
            {title}
          </span>
          <IconChevronDownLine style={{ width: "var(--seed-dimension-x4)", height: "var(--seed-dimension-x4)" }} />
        </button>
      ) : (
        <>
          {title && (
            <span className={mainStyles.title}>
              {title}
            </span>
          )}
          {subtitle && (
            <span className={mainStyles.subtitle}>
              {subtitle}
            </span>
          )}
        </>
      )}
    </div>
  );
}

export interface TopNavigationRightProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: "cupertino" | "android";
  tone?: "layer" | "transparent";
}

export function TopNavigationRight({
  theme = "cupertino",
  tone = "layer",
  className,
  style,
  children,
  ...props
}: TopNavigationRightProps) {
  const styles = appBar({ theme, tone });

  return (
    <div
      className={`${styles.right} ${className || ""}`}
      style={{
        flexShrink: 0,
        zIndex: 1,
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
  theme?: "cupertino" | "android";
  tone?: "layer" | "transparent";
}

export function TopNavigationIconButton({
  badge,
  badgeSize = "large",
  theme = "cupertino",
  tone = "layer",
  children,
  className,
  style,
  ...props
}: TopNavigationIconButtonProps) {
  const styles = appBar({ theme, tone });

  return (
    <div style={{ position: "relative", display: "inline-flex" }}>
      <button
        type="button"
        className={`${styles.iconButton} ${className || ""}`}
        style={{
          cursor: "pointer",
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

export interface TopNavigationBackButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: "cupertino" | "android";
  tone?: "layer" | "transparent";
}

export function TopNavigationBackButton({
  theme = "cupertino",
  tone = "layer",
  className,
  style,
  ...props
}: TopNavigationBackButtonProps) {
  const styles = appBar({ theme, tone });

  return (
    <button
      type="button"
      aria-label="뒤로가기"
      className={`${styles.iconButton} ${className || ""}`}
      style={{
        cursor: "pointer",
        ...style,
      }}
      {...props}
    >
      <IconChevronLeftLine className={styles.icon} />
    </button>
  );
}

export interface TopNavigationCloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: "cupertino" | "android";
  tone?: "layer" | "transparent";
}

export function TopNavigationCloseButton({
  theme = "cupertino",
  tone = "layer",
  className,
  style,
  ...props
}: TopNavigationCloseButtonProps) {
  const styles = appBar({ theme, tone });

  return (
    <button
      type="button"
      aria-label="닫기"
      className={`${styles.iconButton} ${className || ""}`}
      style={{
        cursor: "pointer",
        ...style,
      }}
      {...props}
    >
      <IconXmarkLine className={styles.icon} />
    </button>
  );
}
