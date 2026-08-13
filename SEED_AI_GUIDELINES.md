# SEED Design 2.0 AI Development & Engineering Guidelines

> **Notice for AI Coding Assistants (Antigravity, Claude Code, Cursor, Copilot, etc.)**
> This repository (`axpublish-init`) strictly follows **SEED Design System 2.0** specifications and architecture.
> Any AI agent continuing development on this codebase MUST read and strictly adhere to the rules in this document.

---

## 1. Core Architectural Principles

### 1.1. 100% SEED CLI React UI Component Paradigm
- All UI components MUST be installed via `npx @seed-design/cli add ui:*` or imported from `@seed-design/react`.
- Components are located in `docs/src/components/ui/*.tsx`.
- NEVER create raw manual BEM HTML strings or custom un-tokenized components.
- Run `npx @seed-design/cli compat` to verify component snippet compatibility before finalizing changes.

### 1.2. Strict 100% Zero-Hardcoding Directive (CSS Tokens Only)
- NEVER hardcode inline hex colors, static pixel margins, font sizes, or arbitrary border radii.
- EVERY color, spacing, font size, and elevation MUST use official SEED Design System CSS Tokens from `@seed-design/css/vars`:
  - **Foreground/Text Colors**: `var(--seed-color-fg-neutral)`, `var(--seed-color-fg-neutral-subtle)`, `var(--seed-color-fg-neutral-muted)`, `var(--seed-color-fg-neutral-inverted)`
  - **Background Colors**: `var(--seed-color-bg-neutral-weak)`, `var(--seed-color-bg-neutral-inverted)`, `var(--seed-color-bg-brand-solid)`, `var(--seed-color-bg-critical-solid)`
  - **Spacing/Dimensions**: `var(--seed-dimension-x1)`, `var(--seed-dimension-x2)`, `var(--seed-dimension-x3)`, `var(--seed-dimension-x4)`, `var(--seed-dimension-x6)`, `var(--seed-dimension-x7)`
  - **Typography**: `var(--seed-font-size-t1)` ~ `var(--seed-font-size-t14)`, `var(--seed-line-height-t1)` ~ `var(--seed-line-height-t14)`, `var(--seed-font-weight-bold)`
  - **Palette Colors**: `var(--seed-color-palette-green-600)`, `var(--seed-color-palette-blue-600)`
- **FORBIDDEN**: Direct imports of internal component variables (`@seed-design/css/vars/component/*` or `--seed-action-button-*`). These are non-SemVer internal implementation details. Always use role-based design tokens.

---

### 2.2. Icon Composition Pattern (`PrefixIcon`, `SuffixIcon`, `Icon`)
- Use `<Icon svg={<IconComponent />} />` for standalone icons or icon-only buttons (`layout="iconOnly"`).
- Use `<PrefixIcon svg={<IconComponent />} />` for icons placed BEFORE text in buttons/chips.
- Use `<SuffixIcon svg={<IconComponent />} />` for icons placed AFTER text in buttons/chips.
- Icons MUST be wrapped in these standard SEED wrappers to ensure proper flex alignment and DOM prop cleanliness.

### 2.3. Typography `<Text>` Component & Text Styles
- Use `<Text>` from `@seed-design/react` for typography rendering.
- Always prefer `textStyle` prop for 1:1 Figma Text Style mapping (e.g. `textStyle="t5Regular"` or `textStyle="t14Bold"`).
- Use `maxLines={N}` (e.g. `maxLines={2}`) for clean multi-line truncation with automatic ellipsis (`…`).
- Use `textStyle="t3StaticRegular"` for static non-scaling typography when required.

### 2.4. Layout Primitives (`Box`, `Flex`, `Grid`, `VStack`, `HStack`, `Float`)
- Always prefer SEED React Layout Primitives (`Box`, `Flex`, `Grid`, `VStack`, `HStack`, `Float`) from `@seed-design/react` over un-tokenized manual divs for component layout composition.
- **`Box`**: Token-aware container (`bg="bg.neutralWeak"`, `px="x3"`, `py="x2"`, `borderRadius="r2"`, `backgroundGradient="highlightMagic"`).
- **`VStack` / `HStack`**: Vertical/Horizontal stack containers with token spacing (`gap="x2"`, `align="center"`, `justify="space-between"`).
- **`Flex`**: Flexbox layout container (`direction="column" | "row"`, `wrap="wrap"`).
- **`Grid`**: Responsive CSS grid container (`columns={{ base: 1, md: 2, xl: 4 }}`, `gap={{ base: "x3", md: "x4" }}`).
- **`Float`**: Floating/Absolute placement container for floating buttons, badges, tooltips (`placement="top-start" | "bottom-end"`).

### 2.5. Foundation Utility Components (`Article`, `Divider`, `Skeleton`, `VisuallyHidden`, `AspectRatio`)
- **`<Article>`**: Text selection & multilingual word-break utility. Enables text selection (`user-select: text`) inside `user-select: none` mobile views and handles language-specific line breaks (`lang="ko-KR"` / `"ja-JP"` / `"en-US"`).
- **`<Divider>`**: Structural separator (`orientation="horizontal" | "vertical"`).
- **`<Skeleton>`**: Shimmering loading placeholder (`width`, `height`, `borderRadius`).
- **`<VisuallyHidden>`**: Accessible screen-reader text utility (`<VisuallyHidden>닫기</VisuallyHidden>`).
- **`<AspectRatio>`**: Fixed ratio image/video container (`ratio={16 / 9}`).

---

## 3. Interaction States & Responsive System

### 3.1. Device-Adaptive Interaction States
- SEED automatically handles mouse (`hover: hover`) vs. touch mobile (`pointer: coarse`) pressed states.
- Do NOT write custom hover media query hacks inside component demos; rely on SEED's built-in pressed state behavior and Focus Ring keyboard accessibility.

### 3.2. Responsive Breakpoints
- Mobile-First Breakpoints: `base` (0px), `sm` (480px), `md` (768px), `lg` (1280px), `xl` (1440px).
- Prefer CSS-based responsive props (`padding={{ base: "x4", md: "x6" }}`) and `hideFrom` over JS hooks. Use `useBreakpoint` / `useBreakpointValue` only when runtime JS logic requires it.

### 3.3. Loading Patterns & UX Rules
- **No Loading UI for < 1s**: Do NOT show spinners/skeletons for fast actions under 1 second (prevents UI flickering).
- **1 ~ 4s Short Loading**: Use `ProgressCircle` (`ui:progress-circle`) or `Skeleton`.
- **4 ~ 10s Content Loading**: Use `Skeleton` for structured list/card views so users anticipate incoming layout.
- **> 10s Long Processing**: Use `ProgressCircle` (Determinate) with retry/cancel options.

### 3.4. Bottom Navigation UX & Layout Rules
- **React Package Status**: React package component is `Not Planned` (handled at Native/Webview container level).
- **Max Container Width**: Capped at `max-width: 480px` (`margin: 0 auto`) to prevent items stretching excessively on tablet/desktop.
- **Max Item Count**: Maximum 5 items. Never exceed 5 tab items in Bottom Navigation (use top `Tabs` for more items).
- **Icon Style Rule**: Always use **Fill style icons** for all tab items. NEVER mix Line and Fill icons. Distinguish active/inactive state using color tone.
- **Notification Badges**: Small (dot) or Large (numbers 1~99, 99+). Max 3 items with badges simultaneously.

---

## 4. Library Dependencies & Single Bundle Policy

### 4.1. `peerDependencies` Rule for Shared Packages
- Declare SEED packages in `peerDependencies` (`"^2.0.0"`) and `devDependencies` (`"^2.3.0"`), NEVER in `dependencies` for npm libraries.
- Ensure build tools (Vite, Rollup, tsup) set `external: [/^@seed-design\//]` so SEED CSS is never bundled twice in consumer projects.
- `import '@seed-design/css/all.css'` MUST remain strictly at the app entry point (`docs/src/main.jsx`).

---

## 5. Verification Checklist for AI Agents

Before declaring any task complete, the AI agent MUST run:
1. `npm run build` in `docs/` — Must compile in under 2 seconds with 0 errors.
2. `npx @seed-design/cli compat` in `docs/` — Must output `모든 스니펫이 현재 @seed-design/react, @seed-design/css와 호환돼요.`
3. Audit all modified files to ensure ZERO inline hardcoded styles or un-tokenized values exist.
