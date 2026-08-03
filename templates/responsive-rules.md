# 📐 [프로젝트명] responsive-rules.md

> **💡 작업자(AI/개발자) 필독 사항**
> 본 문서는 **axpublish** 파이프라인의 반응형 렌더링 규칙 법전입니다.
> 모든 Phase에 걸쳐 이 문서가 최우선 판단 기준입니다.
>
> **기본 작업 원칙**
> 1. 모든 클래스는 Mobile-first 유틸리티 클래스로 작성할 것.
> 2. 여백, 색상, 폰트를 임의로 하드코딩하지 말 것. 토큰 우선.
> 3. Desktop 시안만 있는 섹션은 아래 글로벌 변환 패턴을 적용할 것.

---

## 1. 뷰포트 & 레이아웃 고정값

### 1-1. 브레이크포인트 (수정 금지)

> ⚠️ Tailwind 기본 프리픽스(`md:`/`lg:`/`xl:`)를 쓰지 않는다. `seed-tokens.css`의
> `@theme { --breakpoint-mb: 1280px; --breakpoint-tb: 768px; }`가 커스텀
> 브레이크포인트 이름을 정의하고, Tailwind v4는 `--breakpoint-*` 변수 이름의
> 접미사(`mb`, `tb`)를 그대로 variant 프리픽스로 만든다. (newEromhp 실제 코드와 동일)

| 구간 | 범위 | Tailwind prefix | 의미 |
|:---|:---|:---|:---|
| **Mobile** | 0px ~ 767px | 기본값 (prefix 없음) | — |
| **Tablet 이상** | 768px ~ | `tb:` | min-width: 768px |
| **Desktop 이상** | 1280px ~ | `mb:` | min-width: 1280px |
| **Desktop 미만** | ~ 1279px | `max-mb:` | Tablet+Mobile 공통 (max-width: 1279.98px) |
| **Mobile 전용** | ~ 767px | `max-tb:` | max-width: 767.98px |
| **Tablet 밴드만** | 768px ~ 1279px | `tb:max-mb:` | 두 프리픽스 조합 |

### 1-2. 컨테이너 구조 (수정 금지)

> ⚠️ **패딩은 뷰포트마다 다르다** (이롬넷 레퍼런스 실측: Desktop 64px / Tablet 48px /
> Mobile 20px). 예전엔 전 뷰포트 20px 균일로 가정했으나 실측 결과 오류로 확인돼 수정.
> `max-w-[...] mx-auto px-[...]`를 직접 조합하지 말고, `seed-tokens.css`에 정의된
> `container-em` 유틸리티 하나만 쓴다 — max-width·브레이크포인트별 패딩이 전부
> 포함돼 있다 (newEromhp 실제 코드와 동일).

```html
<!-- 모든 섹션 콘텐츠의 표준 래퍼 -->
<div class="container-em">
  ...
</div>
```

| 항목 | 값 |
|:---|:---|
| **max-width** | 1440px |
| **Mobile 패딩** | 좌우 각 20px |
| **Tablet 패딩** | 좌우 각 48px |
| **Desktop 패딩** | 좌우 각 64px |

---

## 2. 타이포그래피 시스템

> **폰트 패밀리:** 기본값 `'Pretendard JP', 'Pretendard', sans-serif`. Primary/Secondary
> 처럼 프로젝트마다 다르면 theme.css에서 `--font-sans`를 override한다.
> (이롬넷 레퍼런스는 `'Wanted Sans Variable'`)

### 2-0. font-size(clamp) / line-height / letter-spacing 바인딩 원리 (중요)

이롬넷 레퍼런스 파일을 Desktop/Tablet/Mobile 3개 브레이크포인트로 실측하고,
실제 프로덕션 코드(`src/index.css`의 `--fs-*` 변수)와 대조한 결과:

- **font-size는 clamp() 기반 fluid 값**이다. `clamp(Mobile값, calc(intercept + slope*vw), Desktop값)`
  형태로 뷰포트 폭에 따라 연속적으로 스케일된다. 3단계 스텝(Mobile/Tablet/Desktop
  고정값을 미디어쿼리로 전환)이 아니라 매 픽셀 단위로 부드럽게 커진다. 앵커는
  Desktop 1280px 뷰포트 / Mobile 390px 뷰포트 (Figma content-min-width와 동일).
- **line-height는 unitless 배수**(예: Display 1 = `1.15`)로 정의된다. font-size가
  clamp()로 줄어들면 line-height도 같은 비율로 자동으로 줄어들기 때문에, 별도
  처리가 필요 없다.
- **letter-spacing은 rem 고정값**으로 정의된다. Figma의 letter-spacing 필드가
  rem을 지원하지 않아 화면엔 px로 찍히지만, 실제 계산 기준은 루트 폰트 크기(16px)
  기준 rem이라 로컬 font-size가 바뀌어도 값이 같이 줄어들지 않는다. (`em` 단위로
  넣으면 요소 자신의 font-size에 비례해 버려서 실제 패턴과 어긋난다 — 흔한 실수)

`seed-tokens.css`는 이 원리에 따라 `--font-size-*`(clamp)·`--font-lh-*`(unitless)·
`--font-ls-*`(rem 고정)를 `:root`에 한 번만 정의한다. 미디어쿼리 오버라이드 자체가
필요 없다 — Caption처럼 완전히 고정인 스타일만 clamp() 없이 고정 px로 둔다.

### 2-1. 반응형 규칙 원칙

실측 결과 "Body 이하는 전부 고정"이라는 기존 가정은 부정확했다. **Caption만 완전히
고정**이고, Body·Label은 Desktop→Tablet에서 미세하게 줄어든 뒤 Tablet=Mobile로
고정되는 패턴이다.

| 분류 | Mobile | Tablet | Desktop | 반응형 여부 |
|:---|:---|:---|:---|:---|
| Display Hero/Counter | 축소 | 중간 | Figma 원본 | ✅ 반응형 |
| Display 1~3 | 축소 | 중간 | Figma 원본 | ✅ 반응형 |
| Title 1~3 | 축소 | 중간 | Figma 원본 | ✅ 반응형 |
| Heading 1~2 | 축소 | 중간 | Figma 원본 | ✅ 반응형 |
| Headline 1~2 | 축소 | 중간 | Figma 원본 | ✅ 반응형 |
| **Body 1~2** | Tablet과 동일 | **소폭 축소** | Figma 원본 | ✅ 반응형 (미세) |
| **Label 1~2** | Tablet과 동일 | **소폭 축소** | Figma 원본 | ✅ 반응형 (미세) |
| **Caption 1~2** | **고정** | **고정** | **고정** | ❌ 완전 고정 |

> **작동 방식:** `text-[length:var(--seed-font-size-t15)] leading-[var(--seed-line-height-t15)]
> tracking-[var(--font-ls-display-1)]` 세 개를 세트로 쓰면 됨(tailwind.config.js가
> 없어 `text-display-1`처럼 하나로 뭉친 유틸리티 클래스는 없다). font-size는
> clamp()라 뷰포트 폭이 바뀔 때마다 자동으로 연속 스케일되고, line-height/letter-spacing은
> 위 2-0 원리에 따라 별도 처리 없이 같이 맞춰짐.

### 2-2. 뷰포트별 폰트 크기 (seed-tokens.css 기준 — clamp() 양끝값)

`✓`= 이롬넷 레퍼런스로 실측 검증됨. `⚠` = 이번 화면에서 미실측, 기존 추정치 유지.
표의 Tablet 열은 고정 스텝이 아니라 해당 뷰포트 폭에서 clamp()가 계산하는 근사값이다.

| 스타일명 (`--font-size-{name}`) | Mobile | Tablet | Desktop | 용도 |
|:---|:---|:---|:---|:---|
| `display-hero` | 40px ✓ | 73px ✓ | **120px** ✓ | 초대형 히어로 타이틀 |
| `display-counter` | ⚠ | 110px ✓ | **180px** ✓ | 숫자 카운터/통계 강조 |
| `display-1` | 28px ✓ | 41px ✓ | **60px** ✓ | 최대 강조 타이틀 |
| `display-2` | 22px ✓ | 31px ✓ | **44px** ✓ | 히어로 타이틀 |
| `display-3` | 24px ⚠ | 30px ⚠ | **36px** ⚠ | 장식적 대형 텍스트 |
| `title-1` | 22px ⚠ | 28px ⚠ | **32px** ⚠ | 페이지 주요 제목 |
| `title-2` | 20px ⚠ | 23px ✓ | **30px** ✓ | 섹션 제목 |
| `title-3` | 18px ✓ | 22px ⚠ | **24px** ✓ | 카드/모달 제목 |
| `heading-1` | 17px ⚠ | 20px ⚠ | **22px** ⚠ | 섹션 내 소제목 |
| `heading-2` | 16px ⚠ | 18px ✓ | **20px** ✓ | 컴포넌트 레이블 |
| `headline-1` | 15px ✓ | 16px ✓ | **18px** ✓ | 본문 강조 |
| `headline-2` | 15px ⚠ | 16px ⚠ | **17px** ⚠ | 본문 강조 소 |
| `body-1` | 15px ✓ | 15px ✓ | **16px** ✓ | 주요 본문 |
| `body-1-reading` | 15px ✓ | 15px ✓ | **16px** ✓ | 긴 본문 reading |
| `body-2` | 14px ✓ | 15px ✓ | **15px** ✓ | 기본 본문 |
| `label-1` | 13px ✓ | 13px ✓ | **14px** ✓ | UI 레이블 |
| `label-2` | 12px ⚠ | 12px ⚠ | **13px** ⚠ | 보조 레이블 |
| `caption-1` | 12px ✓ | 12px ✓ | **12px** ✓ | 캡션 (완전 고정) |
| `caption-2` | 11px ⚠ | 11px ⚠ | **11px** ⚠ | 최소 캡션 (완전 고정) |

### 2-3. Tailwind 클래스 작성 패턴

```html
<!-- ✅ 올바른 방법: CSS 변수를 브래킷으로 참조, 뷰포트 전 구간 자동 스케일 -->
<h1 class="text-[length:var(--seed-font-size-t15)] leading-[var(--seed-line-height-t15)]
           tracking-[var(--font-ls-display-1)] font-bold text-[color:var(--seed-color-fg-neutral)]">
  제목
</h1>

<!-- ❌ 잘못된 방법 1: 뷰포트별 클래스 중복 (clamp()가 이미 처리함) -->
<h1 class="text-[32px] tb:text-[44px] mb:text-[56px]">제목</h1>

<!-- ❌ 잘못된 방법 2: 토큰 없는 임의 hex/px (CSS 변수 참조 없이 값만 하드코딩) -->
<h1 class="text-[#171719] text-[56px]">제목</h1>
```

### 2-4. Font Weight 클래스

tailwind.config.js가 없으므로 Tailwind v4 기본 제공 유틸리티를 그대로 쓴다
(별도 토큰 매핑 불필요 — newEromhp 실제 코드도 이 기본 클래스를 그대로 사용):

| 클래스 | 값 | 용도 |
|:---|:---|:---|
| `font-normal` | 400 | 일반 본문 |
| `font-medium` | 500 | 강조 본문 |
| `font-semibold` | 600 | 서브 헤딩, 버튼 |
| `font-bold` | 700 | 헤딩, 강조 |

---

## 3. 컬러 토큰 사용 규칙

> tailwind.config.js가 없으므로 색상은 전부 `text-[color:var(--...)]` /
> `bg-[var(--...)]` / `border-[var(--...)]` 브래킷 문법으로 CSS 변수를 직접
> 참조한다 (newEromhp 실제 코드와 동일). 아래 표의 "토큰"은 CSS 변수 이름이며,
> 클래스는 `text-[color:var(--seed-color-fg-neutral)]`처럼 조합해서 쓴다.

### 3-1. 텍스트 컬러 — Label 6단계

| 토큰 (CSS 변수) | 용도 | 투명도 |
|:---|:---|:---|
| `--seed-color-fg-neutral` | 가장 강조, 강력한 제목 | 100% |
| `--seed-color-fg-neutral` | 기본 본문, 일반 제목 | 100% |
| `--seed-color-fg-neutral-muted` | 보조 텍스트 | 88% |
| `--seed-color-fg-neutral-subtle` | 더 흐린 보조 | 61% |
| `--seed-color-fg-neutral-subtle` | 힌트, 플레이스홀더 | 28% |
| `--seed-color-fg-disabled` | 비활성 UI 텍스트 | 16% |

### 3-2. 배경 컬러

| 토큰 (CSS 변수) | 용도 |
|:---|:---|
| `--seed-color-bg-layer-default` | 기본 페이지 배경 |
| `--seed-color-bg-layer-default-alt` | 섹션 교차 배경 |
| `--seed-color-bg-layer-basement` | 섹션 구분용 3단계 배경 (normal-alt보다 한 단계 더 진함) |
| `--seed-color-bg-layer-floating` | 카드, 드롭다운 |
| `--seed-color-bg-neutral-weak` | hover 배경, 미묘한 강조 |
| `--seed-color-bg-neutral-solid` | 더 진한 hover 배경 |
| `--seed-color-fg-brand` / `--seed-color-fg-brand` | 브랜드 포인트 강조 (Primary alias) |

### 3-3. 테두리

| 토큰 (CSS 변수) | 종류 | 용도 |
|:---|:---|:---|
| `--seed-color-stroke-neutral-solid` | 불투명 | 카드 테두리, 구분선 |
| `--seed-color-stroke-neutral-solid` | 불투명, 연함 | 더 연한 구분선 |
| `--seed-color-stroke-neutral-muted` | 불투명, 강조(거의 검정) | 강한 대비가 필요한 강조 테두리 |
| `--seed-color-stroke-neutral-subtle` | 반투명 | 배경 위에 겹치는 구분선 |

### 3-4. 테두리 두께

Tailwind v4 기본 `border` 클래스 자체가 1px라 `--stroke-weight-1`(1px)과 값이
같다. 다만 토큰 추적을 명확히 하려면 브래킷으로 직접 참조한다:
`border-[length:var(--stroke-weight-1)]`. 임의 px 하드코딩 금지.

### 3-5. 예시

```html
<div class="bg-[var(--seed-color-bg-layer-floating)] border border-[var(--seed-color-stroke-neutral-solid)] text-[color:var(--seed-color-fg-neutral)]">
  ...
</div>
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
  <button class="w-full mb:w-auto">Secondary</button>
  <button class="w-full mb:w-auto">Primary CTA</button>
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
<div class="fixed bottom-0 left-0 w-full rounded-t-[length:var(--radius-xlarge)]
            mb:relative mb:rounded-[length:var(--radius-large)] mb:max-w-[600px]">
```

---

---

## 4. Figma Auto-layout → CSS 변환 룰

> **Figma에서 읽은 Auto-layout 값을 그대로 아래 표로 변환한다.**
> 업계 표준(W3C CSS Flexbox / Grid) 기준.

### 4-1. 방향 (Direction)

| Figma | CSS 의미 | Tailwind |
|:---|:---|:---|
| Horizontal (가로) | flex-direction: row | flex flex-row |
| Vertical (세로) | flex-direction: column | flex flex-col |

### 4-2. 주축 정렬 — 자식 배치 방향

| Figma | CSS 의미 | Tailwind |
|:---|:---|:---|
| Packed — 시작 | justify-content: flex-start | justify-start |
| Packed — 중앙 | justify-content: center | justify-center |
| Packed — 끝 | justify-content: flex-end | justify-end |
| Space between | justify-content: space-between | justify-between |

### 4-3. 교차축 정렬 — 반대 방향 정렬

| Figma | CSS 의미 | Tailwind |
|:---|:---|:---|
| Top / Left (시작) | align-items: flex-start | items-start |
| Center | align-items: center | items-center |
| Bottom / Right (끝) | align-items: flex-end | items-end |
| Baseline | align-items: baseline | items-baseline |

### 4-4. 간격 (Gap)

| Figma | CSS 의미 | Tailwind |
|:---|:---|:---|
| Gap: Xpx (균일) | gap: Xpx | gap-[Xpx] |
| Row gap / Column gap 개별 | row-gap / column-gap | gap-y-[Xpx] / gap-x-[Xpx] |

### 4-5. 너비 / 높이 (Sizing)

| Figma | CSS 의미 | Tailwind |
|:---|:---|:---|
| Fill container (부모 꽉 채움) | width: 100% | w-full |
| Hug contents (내용 크기만큼) | width: fit-content | w-fit |
| Fixed: Xpx (고정) | width: Xpx | w-[Xpx] |
| Fill — flex 자식이 남은 공간 전부 | flex: 1 | flex-1 |

> 높이도 동일 패턴: h-full / h-fit / h-[Xpx] / flex-1

### 4-6. 줄바꿈 (Wrap)

| Figma | CSS 의미 | Tailwind |
|:---|:---|:---|
| Wrap (여러 줄 허용) | flex-wrap: wrap | flex-wrap |
| No wrap (한 줄 고정) | flex-wrap: nowrap | flex-nowrap |

### 4-7. 넘침 처리 (Overflow)

| Figma | CSS 의미 | Tailwind |
|:---|:---|:---|
| Clip (잘라냄) | overflow: hidden | overflow-hidden |
| Scroll — 가로 | overflow-x: auto | overflow-x-auto |
| Scroll — 세로 | overflow-y: auto | overflow-y-auto |
| Visible (기본) | overflow: visible | (클래스 불필요) |

### 4-8. 그리드 (Layout Grid)

| Figma | CSS 의미 | Tailwind |
|:---|:---|:---|
| N열, 균일 너비 | grid-template-columns: repeat(N, 1fr) | grid grid-cols-N |
| 자동 열 (내용 너비 기준) | grid-auto-flow: column | grid grid-flow-col |

### 4-9. 위치 (Position)

| Figma | CSS 의미 | Tailwind |
|:---|:---|:---|
| Auto-layout 자식 (기본) | 일반 흐름 (static) | 클래스 불필요 |
| Absolute (독립 배치) | position: absolute | absolute |
| Absolute + 우상단 | position: absolute; top:0; right:0 | absolute top-0 right-0 |
| Fixed (스크롤 무관 고정) | position: fixed | fixed |
| Sticky (스크롤 따라가다 고정) | position: sticky; top:0 | sticky top-0 |

### 4-10. 변환 예시 (실전)

```
Figma: Horizontal / Align Center / Gap 12px / Padding 상하10 좌우20 / Fill container
→ class="flex flex-row items-center gap-[12px] py-[10px] px-[20px] w-full"

Figma: Vertical / Align Start / Gap 24px / Hug / Overflow Clip
→ class="flex flex-col items-start gap-[24px] w-fit overflow-hidden"

Figma: Layout Grid 3열 / Gap 20px
→ class="grid grid-cols-3 gap-[20px]"
```

## 6. AI PAUSE 트리거

다음 상황에서는 즉시 작업을 중단하고 디자이너에게 보고 후 결정 대기.

| 트리거 | 보고 형식 |
|:---|:---|
| Seed Design 시스템에 없는 색상 발견 | `"#HEX (X회 사용). [A] accent 토큰 추가 [B] 가장 유사한 시맨틱으로 대체"` |
| 5열 이상 그리드 발견 | `"X열 그리드는 기본 패턴 범위 밖입니다. 모바일 처리 방식을 선택해 주세요."` |
| Figma 시안에 애니메이션/인터랙션 명시 | `"X 컴포넌트에 인터랙션이 감지되었습니다. 구현 범위에 포함할까요?"` |
| 레이아웃이 규칙으로 처리 불가 | `"X 섹션은 공통 패턴으로 처리가 어렵습니다. 처리 방식을 알려주세요."` |

---

## 7. 금지 사항

```
❌ px값 직접 하드코딩 (style="padding: 23px")
❌ CSS 변수를 참조하지 않는 임의 색상/크기 (bg-[#E0F7FA], text-[22px])
   ✅ CSS 변수를 브래킷으로 참조하는 건 정상 패턴 (bg-[var(--seed-color-bg-layer-default)])
❌ !important 사용
❌ 인라인 style="" 속성 사용
❌ Tailwind 기본 색상 클래스 직접 사용 (bg-blue-500 → 반드시 CSS 변수 토큰으로)
❌ Tailwind 기본 브레이크포인트 프리픽스 사용 (md:/lg:/xl: → 반드시 tb:/mb: 커스텀 프리픽스 사용)
❌ tailwind.config.js 파일 생성 (v4는 CSS 네이티브 — @theme/@utility로 설정)
❌ 독자 판단으로 예외 처리 (반드시 PAUSE 후 보고)
```
