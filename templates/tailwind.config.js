/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{html,js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {

      /* ────────────────────────────────────────────────────
       *  FONT FAMILY
       * ──────────────────────────────────────────────────── */
      fontFamily: {
        sans:     ['Pretendard JP', 'Pretendard', 'sans-serif'],
        fallback: ['Inter', 'sans-serif'],
      },

      /* ────────────────────────────────────────────────────
       *  COLORS — Semantic Tokens
       *  하드코딩 절대 금지. 반드시 이 토큰만 사용.
       * ──────────────────────────────────────────────────── */
      colors: {

        /* Primary — tokens.css 기본값, theme.css로 override */
        primary: {
          normal: 'var(--color-primary-normal)',
          strong: 'var(--color-primary-strong)',
          heavy:  'var(--color-primary-heavy)',
          /* Primitive scale (배경 tint 등에 직접 사용 시) */
          10: 'var(--color-primary-10)',
          30: 'var(--color-primary-30)',
          50: 'var(--color-primary-50)',
          60: 'var(--color-primary-60)',
          80: 'var(--color-primary-80)',
          90: 'var(--color-primary-90)',
          95: 'var(--color-primary-95)',
          99: 'var(--color-primary-99)',
        },

        /* Secondary — theme.css에서 생성 (generate-theme.js 필수) */
        secondary: {
          normal: 'var(--color-secondary-normal)',
          strong: 'var(--color-secondary-strong)',
          heavy:  'var(--color-secondary-heavy)',
          10: 'var(--color-secondary-10)',
          30: 'var(--color-secondary-30)',
          50: 'var(--color-secondary-50)',
          60: 'var(--color-secondary-60)',
          80: 'var(--color-secondary-80)',
          90: 'var(--color-secondary-90)',
          95: 'var(--color-secondary-95)',
          99: 'var(--color-secondary-99)',
        },

        /* Label (Text) */
        label: {
          strong:      'var(--color-label-strong)',
          normal:      'var(--color-label-normal)',
          neutral:     'var(--color-label-neutral)',
          alternative: 'var(--color-label-alternative)',
          assistive:   'var(--color-label-assistive)',
          disable:     'var(--color-label-disable)',
        },

        /* Background */
        bg: {
          normal:          'var(--color-bg-normal)',
          'normal-alt':    'var(--color-bg-normal-alt)',
          elevated:        'var(--color-bg-elevated)',
          'elevated-alt':  'var(--color-bg-elevated-alt)',
          'trans-normal':  'var(--color-bg-transparent-normal)',
          'trans-alt':     'var(--color-bg-transparent-alt)',
        },

        /* Interaction */
        interaction: {
          inactive: 'var(--color-interaction-inactive)',
          disable:  'var(--color-interaction-disable)',
        },

        /* Line / Border */
        line: {
          normal:         'var(--color-line-normal)',
          'normal-n':     'var(--color-line-normal-neutral)',
          'normal-alt':   'var(--color-line-normal-alt)',
          'normal-s':     'var(--color-line-normal-strong)',
          solid:          'var(--color-line-solid)',
          'solid-n':      'var(--color-line-solid-neutral)',
          'solid-alt':    'var(--color-line-solid-alt)',
          'solid-s':      'var(--color-line-solid-strong)',
        },

        /* Fill */
        fill: {
          normal: 'var(--color-fill-normal)',
          strong: 'var(--color-fill-strong)',
          alt:    'var(--color-fill-alt)',
        },

        /* Status */
        status: {
          positive:   'var(--color-status-positive)',
          cautionary: 'var(--color-status-cautionary)',
          negative:   'var(--color-status-negative)',
        },

        /* Static */
        static: {
          white: 'var(--color-static-white)',
          black: 'var(--color-static-black)',
        },

        /* Material */
        material: {
          dimmer: 'var(--color-material-dimmer)',
        },

        /* Inverse */
        inverse: {
          primary:    'var(--color-inverse-primary)',
          background: 'var(--color-inverse-background)',
          label:      'var(--color-inverse-label)',
        },

        /* Accent Background */
        'accent-bg': {
          redorange: 'var(--color-accent-bg-redorange)',
          lime:      'var(--color-accent-bg-lime)',
          cyan:      'var(--color-accent-bg-cyan)',
          lightblue: 'var(--color-accent-bg-lightblue)',
          violet:    'var(--color-accent-bg-violet)',
          purple:    'var(--color-accent-bg-purple)',
          pink:      'var(--color-accent-bg-pink)',
        },

        /* Accent Foreground */
        'accent-fg': {
          red:       'var(--color-accent-fg-red)',
          redorange: 'var(--color-accent-fg-redorange)',
          orange:    'var(--color-accent-fg-orange)',
          lime:      'var(--color-accent-fg-lime)',
          green:     'var(--color-accent-fg-green)',
          cyan:      'var(--color-accent-fg-cyan)',
          lightblue: 'var(--color-accent-fg-lightblue)',
          blue:      'var(--color-accent-fg-blue)',
          violet:    'var(--color-accent-fg-violet)',
          purple:    'var(--color-accent-fg-purple)',
          pink:      'var(--color-accent-fg-pink)',
        },
      },

      /* ────────────────────────────────────────────────────
       *  FONT SIZE
       *  클래스명: text-display-1, text-body-1, text-caption-2 …
       * ──────────────────────────────────────────────────── */
      fontSize: {
        'display-1':  ['var(--font-size-display-1)',  { lineHeight: 'var(--font-lh-display-1)',  letterSpacing: 'var(--font-ls-display-1)'  }],
        'display-2':  ['var(--font-size-display-2)',  { lineHeight: 'var(--font-lh-display-2)',  letterSpacing: 'var(--font-ls-display-2)'  }],
        'display-3':  ['var(--font-size-display-3)',  { lineHeight: 'var(--font-lh-display-3)',  letterSpacing: 'var(--font-ls-display-3)'  }],
        'title-1':    ['var(--font-size-title-1)',    { lineHeight: 'var(--font-lh-title-1)',    letterSpacing: 'var(--font-ls-title-1)'    }],
        'title-2':    ['var(--font-size-title-2)',    { lineHeight: 'var(--font-lh-title-2)',    letterSpacing: 'var(--font-ls-title-2)'    }],
        'title-3':    ['var(--font-size-title-3)',    { lineHeight: 'var(--font-lh-title-3)',    letterSpacing: 'var(--font-ls-title-3)'    }],
        'heading-1':  ['var(--font-size-heading-1)',  { lineHeight: 'var(--font-lh-heading-1)',  letterSpacing: 'var(--font-ls-heading-1)'  }],
        'heading-2':  ['var(--font-size-heading-2)',  { lineHeight: 'var(--font-lh-heading-2)',  letterSpacing: 'var(--font-ls-heading-2)'  }],
        'headline-1': ['var(--font-size-headline-1)', { lineHeight: 'var(--font-lh-headline-1)', letterSpacing: 'var(--font-ls-headline-1)' }],
        'headline-2': ['var(--font-size-headline-2)', { lineHeight: 'var(--font-lh-headline-2)', letterSpacing: 'var(--font-ls-headline-2)' }],
        'body-1':     ['var(--font-size-body-1)',     { lineHeight: 'var(--font-lh-body-1)',     letterSpacing: 'var(--font-ls-body-1)'     }],
        'body-1-r':   ['var(--font-size-body-1)',     { lineHeight: 'var(--font-lh-body-1-reading)', letterSpacing: 'var(--font-ls-body-1)' }],
        'body-2':     ['var(--font-size-body-2)',     { lineHeight: 'var(--font-lh-body-2)',     letterSpacing: 'var(--font-ls-body-2)'     }],
        'body-2-r':   ['var(--font-size-body-2)',     { lineHeight: 'var(--font-lh-body-2-reading)', letterSpacing: 'var(--font-ls-body-2)' }],
        'label-1':    ['var(--font-size-label-1)',    { lineHeight: 'var(--font-lh-label-1)',    letterSpacing: 'var(--font-ls-label-1)'    }],
        'label-1-r':  ['var(--font-size-label-1)',    { lineHeight: 'var(--font-lh-label-1-reading)', letterSpacing: 'var(--font-ls-label-1)' }],
        'label-2':    ['var(--font-size-label-2)',    { lineHeight: 'var(--font-lh-label-2)',    letterSpacing: 'var(--font-ls-label-2)'    }],
        'caption-1':  ['var(--font-size-caption-1)',  { lineHeight: 'var(--font-lh-caption-1)',  letterSpacing: 'var(--font-ls-caption-1)'  }],
        'caption-2':  ['var(--font-size-caption-2)',  { lineHeight: 'var(--font-lh-caption-2)',  letterSpacing: 'var(--font-ls-caption-2)'  }],
      },

      /* ────────────────────────────────────────────────────
       *  FONT WEIGHT
       * ──────────────────────────────────────────────────── */
      fontWeight: {
        regular: '400',
        medium:  '500',
        semibold: '600',
        bold:    '700',
      },

      /* ────────────────────────────────────────────────────
       *  BORDER RADIUS
       * ──────────────────────────────────────────────────── */
      borderRadius: {
        sm:  'var(--radius-small)',
        md:  'var(--radius-medium)',
        lg:  'var(--radius-large)',
        xl:  'var(--radius-xlarge)',
      },

      /* ────────────────────────────────────────────────────
       *  BOX SHADOW
       * ──────────────────────────────────────────────────── */
      boxShadow: {
        xs:     'var(--shadow-xsmall)',
        sm:     'var(--shadow-small)',
        md:     'var(--shadow-medium)',
        lg:     'var(--shadow-large)',
        xl:     'var(--shadow-xlarge)',
        'sp-sm':'var(--shadow-spread-small)',
        'sp-md':'var(--shadow-spread-medium)',
      },

      /* ────────────────────────────────────────────────────
       *  BREAKPOINTS (axlab 고정값)
       *  Mobile: < 768px
       *  Tablet: 768px – 1279px
       *  Desktop: ≥ 1280px (max-width container: 1440px)
       * ──────────────────────────────────────────────────── */
      screens: {
        sm: '390px',
        md: '768px',
        lg: '1280px',
      },

      /* ────────────────────────────────────────────────────
       *  CONTAINER
       *  Figma 원본 기준: 모든 뷰포트 20px 균일
       * ──────────────────────────────────────────────────── */
      container: {
        center: true,
        padding: {
          DEFAULT: '20px',   /* 모든 뷰포트 균일 (Figma 원본) */
        },
        screens: {
          lg: '1440px',      /* Desktop max-width */
        },
      },

      /* ────────────────────────────────────────────────────
       *  SPACING / GAP (컴포넌트 기준)
       * ──────────────────────────────────────────────────── */
      spacing: {
        'gap-normal': '20px',
        'card-tiny':  '6px',
        'margin-platform': '20px',
      },

    },
  },
  plugins: [],
};
