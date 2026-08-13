# SEED Design System 2.0 Project Rules

Any AI assistant working on this repository (`axpublish-init`) MUST follow these strict guidelines:

1. **CLI Component Ownership**:
   - All UI components are installed via `npx @seed-design/cli add ui:*` into `docs/src/components/ui/*.tsx`.
   - Never write raw BEM HTML or un-tokenized components.

2. **Strict Zero-Hardcoding Directive**:
   - 100% of colors, margins, paddings, font sizes, and line heights MUST use official SEED CSS Tokens (`var(--seed-color-*)`, `var(--seed-dimension-*)`, `var(--seed-font-size-*)`).
   - Never import internal component vars (`@seed-design/css/vars/component/*`). Use role-based design tokens only.

3. **Composition & `asChild` Rules**:
   - Components wrapped with `asChild` MUST forward props (`{...props}`) and use `React.forwardRef`.

4. **Library Authors Rules**:
   - SEED packages are in `peerDependencies` (`^2.0.0`) for npm library builds.
   - `import '@seed-design/css/all.css'` is loaded ONCE at `docs/src/main.jsx`.

5. **Verification Requirement**:
   - Always run `npm run build` and `npx @seed-design/cli compat` before declaring success.
