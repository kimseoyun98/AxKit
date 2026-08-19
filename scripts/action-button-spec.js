/**
 * @file scripts/action-button-spec.js
 * @description Single source of truth for the ActionButton Figma variant matrix.
 * Values are taken directly from @seed-design/css/recipes/action-button.css
 * (not approximated), so the generated Figma ComponentSet matches the real
 * React component pixel-for-pixel.
 *
 * Real variant list per action-button.css: brandSolid, neutralSolid, neutralWeak,
 * criticalSolid, brandOutline, neutralOutline, ghost.
 * ("criticalWeak" does not exist in the real recipe and has been removed;
 * "brandOutline" and "ghost" were missing and have been added.)
 */

const ACTION_BUTTON_SPEC = {
  name: "ActionButton",

  properties: {
    variant: [
      "brandSolid",
      "neutralSolid",
      "neutralWeak",
      "criticalSolid",
      "brandOutline",
      "neutralOutline",
      "ghost",
    ],
    size: ["large", "medium", "small", "xsmall"],
    disabled: ["false", "true"],
    loading: ["false", "true"],
  },

  // bg/fg/border are resolved hex fallbacks (light mode) for when the running
  // Figma file has no matching local Variables. cssVar/tokenPath are kept for
  // reference and for the variable-name lookup the generated script attempts first.
  styleMapping: {
    brandSolid: {
      bg: "#FF6600", bgVar: ["Semantic/bg-brand/solid"], cssVar: "--seed-color-bg-brand-solid",
      fg: "#FFFFFF", fgVar: ["Primitive/static/white"], fgCssVar: "--seed-color-palette-static-white",
    },
    neutralSolid: {
      bg: "#2A3038", bgVar: ["Semantic/bg-neutral/inverted"], cssVar: "--seed-color-bg-neutral-inverted",
      fg: "#FFFFFF", fgVar: ["Semantic/fg/neutral-inverted"], fgCssVar: "--seed-color-fg-neutral-inverted",
    },
    neutralWeak: {
      bg: "#F3F4F5", bgVar: ["Semantic/bg-neutral/weak"], cssVar: "--seed-color-bg-neutral-weak",
      fg: "#1A1C20", fgVar: ["Semantic/fg/neutral"], fgCssVar: "--seed-color-fg-neutral",
    },
    criticalSolid: {
      bg: "#FA342C", bgVar: ["Semantic/bg-critical/solid"], cssVar: "--seed-color-bg-critical-solid",
      fg: "#FFFFFF", fgVar: ["Primitive/static/white"], fgCssVar: "--seed-color-palette-static-white",
    },
    brandOutline: {
      bg: null,
      fg: "#FF6600", fgVar: ["Semantic/fg/brand"], fgCssVar: "--seed-color-fg-brand",
      border: "#B0B3BA", borderVar: ["Semantic/stroke/neutral-muted"], borderCssVar: "--seed-color-stroke-neutral-muted",
    },
    neutralOutline: {
      bg: null,
      fg: "#1A1C20", fgVar: ["Semantic/fg/neutral"], fgCssVar: "--seed-color-fg-neutral",
      border: "#B0B3BA", borderVar: ["Semantic/stroke/neutral-muted"], borderCssVar: "--seed-color-stroke-neutral-muted",
    },
    ghost: {
      bg: null,
      fg: "#1A1C20", fgVar: ["Semantic/fg/neutral"], fgCssVar: "--seed-color-fg-neutral",
    },
  },

  // height/radius/paddingX/fontSize taken verbatim from
  // .seed-action-button--size_{size} and .seed-action-button--size_{size}-layout_withText
  sizeMapping: {
    xsmall: { height: 32, radius: 9999, paddingX: 14, fontSize: 13 },
    small: { height: 36, radius: 8, paddingX: 14, fontSize: 14 },
    medium: { height: 40, radius: 8, paddingX: 16, fontSize: 14 },
    large: { height: 52, radius: 12, paddingX: 20, fontSize: 18 },
  },

  // Disabled state overrides bg/fg regardless of variant (action-button.css
  // ":is(:disabled, [disabled], [data-disabled])" rule, identical across all variants).
  disabledOverride: {
    bg: "#F3F4F5", bgVar: ["Semantic/bg/disabled"], cssVar: "--seed-color-bg-disabled",
    fg: "#B0B3BA", fgVar: ["Semantic/fg/disabled"], fgCssVar: "--seed-color-fg-disabled",
  },
};

module.exports = { ACTION_BUTTON_SPEC };
