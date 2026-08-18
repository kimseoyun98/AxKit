# AxKit UI - AI Agent Coding Rules & Architecture Guidelines

You are assisting with the **AxKit UI** project (SEED Engine Based v2.0).
Always adhere strictly to the following engineering standards:

## 1. Design Tokens & Styling
- Always use SEED design tokens: `var(--seed-color-*)`, `var(--seed-dimension-*)`, `var(--seed-font-size-*)`, `var(--seed-radius-*)`.
- Never hardcode raw pixel values for padding or margins (e.g. use `var(--seed-dimension-x4)`).
- Preserve existing SEED CSS recipe classes (`styles.root`, `styles.left`, `styles.right`, `styles.iconButton`, `mainStyles.title`, etc.).
- Always forward `className`, `style`, and `...props` to the root HTML element.

## 2. Component Design & Props
- Wrap components with `React.forwardRef` when appropriate.
- Forward `className={`${styles.root} ${className || ""}`}` and `style={{ ..., ...style }}`.
- Use `TopNavigationContext` for header subcomponents so `theme` and `tone` propagate automatically.
- Maintain WCAG accessibility: include `aria-label` on icon buttons and ensure non-input labels do not mismatch `htmlFor`.

## 3. Stackflow Integration
- Use `layerIndex={useActivityZIndexBase()}` for z-index layering in modals and sheets.
- Control lifecycle with `open={useActivity().isActive}` and `onOpenChange={(open) => !open && pop()}`.

## 4. Code Standards
- Built for React 19 and TypeScript.
- No unused variables or silent error swallowing.
- Keep `docs/src/sections/ComponentGallery.jsx` component demos ordered alphabetically.
