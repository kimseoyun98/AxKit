# 📐 [프로젝트명] responsive-rules.md

> **💡 작업자(AI/개발자) 필독 사항**
> 본 문서는 **axpublish** 파이프라인의 반응형 렌더링 규칙 법전입니다.
> 색상·타이포 토큰 정의는 **`@seed-design/css`** 와 **`seed-seed-tokens.css`** 를 따릅니다.
> 이 문서는 Seed가 다루지 않는 **레이아웃·반응형·Figma 변환 규칙**을 정의합니다.
>
> **기본 작업 원칙**
> 1. 모든 클래스는 Mobile-first 유틸리티 클래스로 작성할 것.
> 2. 여백, 색상, 폰트를 임의로 하드코딩하지 말 것. 토큰 우선.
> 3. Desktop 시안만 있는 섹션은 아래 글로벌 변환 패턴을 적용할 것.

---

## 1. 뷰포트 & 레이아웃 고정값

### 1-1. 브레이크포인트 (수정 금지)

> ⚠️ Tailwind 기본 프리픽스(`md:`/`lg:`/`xl:`)를 쓰지 않는다. `seed-seed-tokens.css`의
> `@theme { --breakpoint-mb: 1280px; --breakpoint-tb: 768px; }`가 커스텀
> 브레이크포인트를 정의하고, Tailwind v4는 `--breakpoint-*` 변수 접미사를 variant 프리픽스로 만든다.

| 구간 | 범위 | Tailwind prefix | 의미 |
|:---|:---|:---|:---|
| **Mobile** | 0px ~ 767px | 기본값 (prefix 없음) | — |
| **Tablet 이상** | 768px ~ | `tb:` | min-width: 768px |
| **Desktop 이상** | 1280px ~ | `mb:` | min-width: 1280px |
| **Desktop 미만** | ~ 1279px | `max-mb:` | Tablet+Mobile 공통 (max-width: 1279.98px) |
| **Mobile 전용** | ~ 767px | `max-tb:` | max-width: 767.98px |
| **Tablet 밴드만** | 768px ~ 1279px | `tb:max-mb:` | 두 프리픽스 조합 |

### 1-2. 컨테이너 구조 (수정 금지)

> `max-w-[...] mx-auto px-[...]`를 직접 조합하지 말고, `seed-seed-tokens.css`에 정의된
> `container-em` 유틸리티 하나만 쓴다 — max-width·브레이크포인트별 패딩이 전부 포함.

```html
<!-- 모든 섹션 콘텐츠의 표준 래퍼 -->
<div class="container-em">
  ...
</div>
```

| 항목 | 값 |
|:---|:---|
| **max-width** | 1440px |
| **Mobile 패딩** | 좌우 각 20px (`--seed-dimension-x5`) |
| **Tablet 패딩** | 좌우 각 48px (`--seed-dimension-x12`) |
| **Desktop 패딩** | 좌우 각 64px (`--seed-dimension-x16`) |

---

## 2. 타이포그래피

> **폰트 패밀리:** 기본값 `'Pretendard JP', 'Pretendard', sans-serif`.
> 프로젝트마다 다르면 `seed-seed-tokens.css`에서 `--font-sans`를 override한다.

### 2-1. Seed 타입 스케일 — 화면별 고정값

`seed-seed-tokens.css` 에서 **t1~t8은 Seed 기본값 고정**, **t9~t16은 화면별 static 값**으로 override.
Seed 컴포넌트 내부(버튼·인풋·배지 등)는 t1~t8을 사용하므로 수정 금지.

| 토큰 | Mobile | Tablet | Desktop | 역할 |
|:---|:---|:---|:---|:---|
| `--seed-font-size-t1` | 11px | 11px | 11px | 극소 캡션 |
| `--seed-font-size-t2` | 12px | 12px | 12px | 캡션 |
| `--seed-font-size-t3` | 13px | 13px | 13px | 보조 레이블 |
| `--seed-font-size-t4` | 14px | 14px | 14px | 레이블·버튼 |
| `--seed-font-size-t5` | 16px | 16px | 16px | 본문 |
| `--seed-font-size-t6` | 18px | 18px | 18px | 큰 본문 |
| `--seed-font-size-t7` | 20px | 20px | 20px | 소제목 |
| `--seed-font-size-t8` | 22px | 22px | 22px | 헤딩 |
| **`--seed-font-size-t9`** ↓ | **20px** | **22px** | **24px** | 소타이틀 |
| **`--seed-font-size-t10`** | **20px** | **24px** | **26px** | 타이틀 3 |
| **`--seed-font-size-t11`** | **22px** | **26px** | **28px** | 타이틀 2 |
| **`--seed-font-size-t12`** | **24px** | **28px** | **32px** | 타이틀 1 |
| **`--seed-font-size-t13`** | **28px** | **36px** | **40px** | Display 2 |
| **`--seed-font-size-t14`** | **30px** | **42px** | **48px** | Display 1 |
| **`--seed-font-size-t15`** ✦ | **32px** | **48px** | **56px** | Display XL |
| **`--seed-font-size-t16`** ✦ | **36px** | **56px** | **72px** | Hero Display |

✦ t15·t16은 Seed 공식 스케일 확장 — `seed-seed-tokens.css`에 정의.

### 2-2. Tailwind 클래스 작성 패턴

```html
<!-- ✅ 올바른 방법: CSS 변수를 브래킷으로 참조 -->
<h1 class="text-[length:var(--seed-font-size-t12)] leading-[var(--seed-line-height-t12)]
           font-bold text-[color:var(--seed-color-fg-neutral)]">
  제목
</h1>

<!-- ✅ 반응형 타이포: 토큰이 미디어쿼리 자동 처리 — 뷰포트별 클래스 중복 불필요 -->
<h1 class="text-[length:var(--seed-font-size-t14)] leading-[var(--seed-line-height-t14)] font-bold">
  Display 제목 (Mobile 30px / Tablet 42px / Desktop 48px 자동 적용)
</h1>

<!-- ❌ 잘못된 방법 1: 뷰포트별 클래스 직접 지정 (토큰이 이미 처리) -->
<h1 class="text-[30px] tb:text-[42px] mb:text-[48px]">제목</h1>

<!-- ❌ 잘못된 방법 2: 임의 하드코딩 -->
<h1 class="text-[#171719] text-[56px]">제목</h1>
```

### 2-3. Font Weight

| 클래스 | 값 | 용도 |
|:---|:---|:---|
| `font-normal` | 400 | 일반 본문 |
| `font-medium` | 500 | 강조 본문 |
| `font-semibold` | 600 | 서브 헤딩, 버튼 |
| `font-bold` | 700 | 헤딩, 강조 |

---

## 3. 컬러 토큰 사용 규칙

> Seed Semantic 토큰(`--seed-color-*`)만 사용. hex 직접 지정 금지.
> 전체 토큰 목록은 **[Seed Design 토큰 문서](https://seed-design.io/react/tokens)** 참조.
> tailwind.config.js가 없으므로 색상은 전부 브래킷 문법으로 CSS 변수를 직접 참조한다.

```html
<!-- 텍스트 -->
text-[color:var(--seed-color-fg-neutral)]
text-[color:var(--seed-color-fg-neutral-muted)]
text-[color:var(--seed-color-fg-brand)]

<!-- 배경 -->
bg-[var(--seed-color-bg-layer-default)]
bg-[var(--seed-color-bg-layer-fill)]
bg-[var(--seed-color-bg-brand-solid)]

<!-- 테두리 -->
border border-[var(--seed-color-stroke-neutral-subtle)]
border border-[var(--seed-color-stroke-neutral-solid)]
```

---

## 4. 특수 뷰포트 규칙

### 4-1. Full-Viewport 섹션

- `min-h-screen` 또는 `min-h-dvh` 적용
- Desktop/Tablet: 기준 높이 초과 시 `overflow-hidden`
- Mobile: 콘텐츠 흐름에 따라 자연 확장 허용

---

## 5. 글로벌 컴포넌트 변환 패턴

> **공통 상속 규칙:** 아래 패턴과 구조적 DNA가 동일한 모든 UI는
> 명시가 없어도 해당 패턴을 기본으로 상속받아 처리한다.

### 5-1. 다단 그리드 / 카드 리스트

| Desktop | Tablet | Mobile |
|:---|:---|:---|
| N열 고정 배치 | N-1열 또는 뷰포트에 맞게 축소 | **1열 세로 스택 (너비 100%)** |

```html
<!-- 3열 → 2열 → 1열 예시 -->
<div class="grid grid-cols-1 tb:grid-cols-2 mb:grid-cols-3 gap-[20px]">
```

> ⚠️ 예외: Figma에서 가로 스크롤(Overflow: Scroll)로 설계된 경우
> 모바일도 동일하게 `overflow-x-auto snap-x snap-mandatory` 적용.

### 5-2. 액션 버튼 그룹

| Desktop / Tablet | Mobile |
|:---|:---|
| Figma 시안 정렬 유지 | 정렬 무시, **너비 100% 세로 스택** |

```html
<div class="flex flex-col w-full gap-[12px] mb:flex-row mb:w-auto mb:justify-end">
  <button class="w-full mb:w-auto">취소</button>
  <button class="w-full mb:w-auto">확인</button>
</div>
```

### 5-3. 비율 고정 컨테이너

```html
<div class="aspect-[16/9] w-full overflow-hidden rounded-md">
  <img class="w-full h-full object-cover" />
</div>
```

### 5-4. 글로벌 내비게이션 (GNB)

| Desktop / Tablet | Mobile |
|:---|:---|
| 로고 + 전체 메뉴 + 유틸리티 노출 | **로고 + 햄버거 아이콘으로 축소** |

### 5-5. 모달 / 다이얼로그

| Desktop / Tablet | Mobile |
|:---|:---|
| 화면 중앙, `max-w-[600px]` | **하단 슬라이드업 (Bottom Sheet)** |

```html
<div class="fixed bottom-0 left-0 w-full rounded-t-[var(--seed-radius-xlarge)]
            mb:relative mb:rounded-[var(--seed-radius-large)] mb:max-w-[600px]">
```

---

## 6. Figma Auto-layout → CSS 변환 룰

> **Figma에서 읽은 Auto-layout 값을 그대로 아래 표로 변환한다.**

### 6-1. 방향 (Direction)

| Figma | Tailwind |
|:---|:---|
| Horizontal (가로) | `flex flex-row` |
| Vertical (세로) | `flex flex-col` |

### 6-2. 주축 정렬

| Figma | Tailwind |
|:---|:---|
| Packed — 시작 | `justify-start` |
| Packed — 중앙 | `justify-center` |
| Packed — 끝 | `justify-end` |
| Space between | `justify-between` |

### 6-3. 교차축 정렬

| Figma | Tailwind |
|:---|:---|
| Top / Left (시작) | `items-start` |
| Center | `items-center` |
| Bottom / Right (끝) | `items-end` |
| Baseline | `items-baseline` |

### 6-4. 간격 (Gap)

| Figma | Tailwind |
|:---|:---|
| Gap: Xpx (균일) | `gap-[Xpx]` |
| Row gap / Column gap | `gap-y-[Xpx]` / `gap-x-[Xpx]` |

> ⚠️ Gap 값도 가능하면 `--seed-dimension-x*` 토큰 참조 권장:
> `gap-[var(--seed-dimension-x4)]` = 16px

### 6-5. 너비 / 높이 (Sizing)

| Figma | Tailwind |
|:---|:---|
| Fill container | `w-full` / `h-full` |
| Hug contents | `w-fit` / `h-fit` |
| Fixed: Xpx | `w-[Xpx]` / `h-[Xpx]` |
| Fill (flex 자식 남은 공간 전부) | `flex-1` |

### 6-6. 줄바꿈 (Wrap)

| Figma | Tailwind |
|:---|:---|
| Wrap | `flex-wrap` |
| No wrap | `flex-nowrap` |

### 6-7. 넘침 처리 (Overflow)

| Figma | Tailwind |
|:---|:---|
| Clip | `overflow-hidden` |
| Scroll — 가로 | `overflow-x-auto` |
| Scroll — 세로 | `overflow-y-auto` |
| Visible | (클래스 불필요) |

### 6-8. 그리드 (Layout Grid)

| Figma | Tailwind |
|:---|:---|
| N열, 균일 너비 | `grid grid-cols-N` |
| 자동 열 | `grid grid-flow-col` |

### 6-9. 위치 (Position)

| Figma | Tailwind |
|:---|:---|
| Auto-layout 자식 (기본) | 클래스 불필요 |
| Absolute | `absolute` |
| Absolute + 우상단 | `absolute top-0 right-0` |
| Fixed | `fixed` |
| Sticky | `sticky top-0` |

### 6-10. 변환 예시 (실전)

```
Figma: Horizontal / Align Center / Gap 12px / Padding 상하10 좌우20 / Fill container
→ class="flex flex-row items-center gap-[12px] py-[10px] px-[20px] w-full"

Figma: Vertical / Align Start / Gap 24px / Hug / Overflow Clip
→ class="flex flex-col items-start gap-[24px] w-fit overflow-hidden"

Figma: Layout Grid 3열 / Gap 20px
→ class="grid grid-cols-3 gap-[20px]"
```

---

## 7. AI PAUSE 트리거

다음 상황에서는 즉시 작업을 중단하고 디자이너에게 보고 후 결정 대기.

| 트리거 | 보고 형식 |
|:---|:---|
| `--seed-color-*` 에 없는 색상 발견 | `"#HEX (X회 사용). [A] 신규 토큰 추가 [B] 가장 유사한 Seed 시맨틱으로 대체 [C] 제거"` |
| 5열 이상 그리드 발견 | `"X열 그리드는 기본 패턴 범위 밖입니다. 모바일 처리 방식을 선택해 주세요."` |
| Figma 시안에 애니메이션/인터랙션 명시 | `"X 컴포넌트에 인터랙션이 감지되었습니다. 구현 범위에 포함할까요?"` |
| 레이아웃이 규칙으로 처리 불가 | `"X 섹션은 공통 패턴으로 처리가 어렵습니다. 처리 방식을 알려주세요."` |

---

## 8. 금지 사항

```
❌ px값 직접 하드코딩 (style="padding: 23px")
❌ CSS 변수를 참조하지 않는 임의 색상/크기 (bg-[#E0F7FA], text-[22px])
   ✅ CSS 변수를 브래킷으로 참조하는 건 정상 패턴 (bg-[var(--seed-color-bg-layer-default)])
❌ !important 사용
❌ 인라인 style="" 속성 사용
❌ Tailwind 기본 색상 클래스 직접 사용 (bg-blue-500 → 반드시 Seed CSS 변수 토큰으로)
❌ Tailwind 기본 브레이크포인트 프리픽스 사용 (md:/lg:/xl: → 반드시 tb:/mb: 커스텀 프리픽스)
❌ tailwind.config.js 파일 생성 (v4는 CSS 네이티브 — @theme/@utility로 설정)
❌ 독자 판단으로 예외 처리 (반드시 PAUSE 후 보고)
```



## Inclusive Design & Accessibility (포용적 디자인 접근성 6대 준수 규칙)

1. **Touch Target Size (터치 영역)**: 모든 버튼, 칩, 입력 필드의 클릭 가능 영역은 최소 `44x44px` (제약 시 최소 `24x24px`) 필수 확보.
2. **Color & APCA Contrast (명암비)**: 본문 텍스트는 APCA Lc 75 이상 (Lc 90 권장), Disabled/Placeholder는 Lc 30 이상 유지.
3. **Screen Reader & Alt Text**: 모든 버튼/아이콘에 `aria-label` 및 대체 텍스트 명시, 장식용 요소는 `aria-hidden="true"`.
4. **Error Handling & Feedback**: 오류 시 `stroke/critical-solid` 테두리 피드백 + `aria-live="polite"`로 보조기술 즉시 알림.
5. **User Motion Control**: `@media (prefers-reduced-motion: reduce)` 감지 시 2초 이상의 애니메이션 자동 중단.
6. **Automatic Media Control**: 자동 재생 오디오/비디오는 기본 음소거 및 사용자가 멈출 수 있는 옵션 필수 제공.



## International Design & i18n (국제화 & 다국어 5대 규칙)

1. **Text Expansion (텍스트 150%~250% 확장 대비)**: 10자 이하 단어(예: '저장' ➔ German 'Speichern' 9자 225%) 번역 시 폭이 터지지 않도록 버튼/라벨의 `white-space: nowrap;` 및 Auto-layout Flex-wrap/Padding 유연성 필수 확보.
2. **Relative Time Format (상대적 시간)**:
   - ko_KR: `방금 전`, `1초 전`, `1분 전`, `1시간 전`, `1일 전`, `1주 전`, `1달 전`, `1년 전`
   - en_US / en_GB / en_CA: `Just now`, `1s`, `1min` ('분' 단위 명확화), `1h`, `1d`, `1w`, `1mo`, `1y`
   - ja_JP: `たった今`, `1秒前`, `1分前`, `1時間前`, `1日前`, `1週間前`, `1か月前`, `1年前`
3. **Date Format (날짜 표기 & 점 축약)**:
   - ko_KR 점(.) 축약 시 마지막 [일] 뒤에도 점을 반드시 표기: `2026. 3. 31.` (마지막 점 필수).
   - en_US / en_CA: `Jul 16, 2015`, en_GB: `16 Jul 2015`, ja_JP: `2015年 7月 16日`
4. **Number & Currency Format (숫자/단위 및 대단위)**:
   - ko_KR: 만(10,000) / 억(100,000,000) 단위 사용 (`1.23만`, `1.23억`, `조회수 3만`, `1,234,567원`).
   - en_US / en_GB: K(1,000) / M(1,000,000) 단위 사용 (`12.3K`, `1.23M`, `30K views`, `$12,345.67`).
5. **Hyphen (-) Range & Bracket Spacing (구간 & 괄호)**:
   - 모든 언어의 구간 표기는 Hyphen(`-`)으로 통일.
   - English 괄호 표기 시 앞 단어 사이 띄어쓰기 필수 (`Exercise (30 min)`).
