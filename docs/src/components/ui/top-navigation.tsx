import * as React from "react";
import { appBar } from "@seed-design/css/recipes/app-bar";
import { appBarMain } from "@seed-design/css/recipes/app-bar-main";
import { IconChevronLeftLine, IconXmarkLine } from "@karrotmarket/react-monochrome-icon";
import { ActionButton } from "./action-button";

export interface TopNavigationProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "root" | "standard";
  title?: string;
  subtitle?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  onBack?: () => void;
  onClose?: () => void;
}

export function TopNavigation({
  variant = "standard",
  title,
  subtitle,
  left,
  right,
  onBack,
  onClose,
  className,
  style,
  ...props
}: TopNavigationProps) {
  const styles = appBar({ theme: "cupertino", tone: "layer" });
  const mainStyles = appBarMain({ layout: subtitle ? "withSubtitle" : "titleOnly", theme: "cupertino" });

  return (
    <header
      className={`${styles.root} ${className || ""}`}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: "56px",
        padding: "0 var(--seed-dimension-x3)",
        backgroundColor: "var(--seed-color-bg-layer-default)",
        borderBottom: "1px solid var(--seed-color-stroke-neutral-weak)",
        boxSizing: "border-box",
        ...style,
      }}
      {...props}
    >
      {/* Left Area */}
      <div style={{ display: "flex", alignItems: "center", gap: "var(--seed-dimension-x2)", minWidth: 40, flexShrink: 0 }}>
        {left ? (
          left
        ) : onBack ? (
          <button
            type="button"
            onClick={onBack}
            aria-label="뒤로가기"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              border: "none",
              background: "transparent",
              cursor: "pointer",
              borderRadius: "var(--seed-dimension-x2)",
              color: "var(--seed-color-fg-neutral)",
            }}
          >
            <IconChevronLeftLine style={{ width: 24, height: 24 }} />
          </button>
        ) : onClose ? (
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              border: "none",
              background: "transparent",
              cursor: "pointer",
              borderRadius: "var(--seed-dimension-x2)",
              color: "var(--seed-color-fg-neutral)",
            }}
          >
            <IconXmarkLine style={{ width: 24, height: 24 }} />
          </button>
        ) : null}
      </div>

      {/* Main Title Area */}
      <div
        className={mainStyles.root}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: variant === "standard" ? "center" : "flex-start",
          justifyContent: "center",
          flex: 1,
          minWidth: 0,
          textAlign: variant === "standard" ? "center" : "left",
          padding: "0 var(--seed-dimension-x2)",
          overflow: "hidden",
        }}
      >
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
      </div>

      {/* Right Area */}
      <div style={{ display: "flex", alignItems: "center", gap: "var(--seed-dimension-x2)", minWidth: 40, justifyContent: "flex-end", flexShrink: 0 }}>
        {right}
      </div>
    </header>
  );
}
