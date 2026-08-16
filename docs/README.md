# AX Design System (SEED Engine Based)

> 100% SEED CLI 컴포넌트(`npx @seed-design/cli add ui:*`) 및 시맨틱 디자인 토큰(`var(--seed-*)`) 기반의 프론트엔드 UI 브랜드 디자인 시스템 쇼케이스 웹 프로젝트입니다.

---

## 🎨 주요 특징 (Features)

- **49개 UI 컴포넌트 스니펫 정식 구현**:
  - `docs/src/components/ui/` 디렉토리에 UI 컴포넌트 스니펫 수록 (신규 `TopNavigation`, `TimePicker` 포함).
  - 컴포넌트 갤러리 A-Z 알파벳순 정렬 적용.
- **반응형 패널 및 시트 오피셜 가이드 준수**:
  - `ResponsiveSidePanel` & `ResponsiveDialog`: 데스크탑 우측/중앙 모달 ↔ 모바일 하단 시트 스마트 자동 전환.
  - 2개 버튼 액션 푸터: 오피셜 `HStack flex: 1` 2열 가로 배치 적용 (`[취소]` | `[확인]`).
- **메뉴 시트 & 바텀시트 가이드라인 100% 준수**:
  - `SwipeableMenuSheet`: `Critical Tone` (위험/중지 빨간색 강조), `Item Description`, 100% 선(Line) 타입 아이콘(`IconPencilLine`, `IconStoreLine`, `IconBellLine`, `IconTrashcanLine`) 스타일 통일.
  - 폼 데이터 보호: `showCloseButton={true}`, `showHandle={false}`를 기본으로 오작동 방지.
- **Strict DOM Prop & WCAG 접근성 검증**:
  - React DOM attribute warnings 0건 (`suffixIcon`, `isIndeterminate` 등 DOM 전달 방지).
  - non-input label의 `for` ID 불일치 경고 해결 (`as="span"` 적용).
- **AI & Tools 통합 연동**:
  - AI 에이전트 연동 스킬명세 (`/ai-integration/skill.txt`)
  - 자동 코드 진단 규칙 (`/ai-integration/doctor.txt`)
  - MCP 연동명세 (`/ai-integration/docs-mcp.txt`)

---

## 📁 프로젝트 구조 (Project Structure)

```text
docs/
├── public/
│   ├── ai-integration/       # AI 에이전트 연동 명세 (skill.txt, doctor.txt, docs-mcp.txt)
│   ├── icons/                # static SVG 아이콘 자산
│   └── llms.txt              # LLM 모델 파싱용 48개 컴포넌트 A-Z 인덱스
├── src/
│   ├── components/
│   │   └── ui/               # 49개 UI 컴포넌트 스니펫 (time-picker, responsive-side-panel 등)
│   ├── sections/
│   │   └── ComponentGallery.jsx  # 48개 쇼케이스 카드가 A-Z 알파벳순으로 포함된 인터랙티브 쇼케이스
│   ├── App.jsx               # 메인 앱 엔트리
│   └── index.css             # SEED 시맨틱 토큰 및 글로벌 테마 스타일
└── package.json
```

---

## 🚀 실행 및 검수 명령어 (Commands)

### 로컬 개발 서버 실행
```bash
npm run dev
```

### 프로덕션 빌드 (Vite Build)
```bash
npm run build
```

### SEED CLI 공식 스니펫 호환성 검사 (Compat Audit)
```bash
npx @seed-design/cli@latest compat
```

---

## 🛠️ 주요 컴포넌트 목록 (Showcase 48 Items A-Z)

1. **Accordion** (`ui:accordion`)
2. **Action Button** (`ui:action-button`)
3. **Alert Dialog** (`ui:alert-dialog`)
4. **Attachment** (`ui:attachment-field`)
5. **Avatar** (`ui:avatar`)
6. **Badge** (`ui:badge`)
7. **Bottom Sheet** (`ui:bottom-sheet`)
8. **Callout** (`ui:callout`)
9. **Checkbox** (`ui:checkbox`)
10. **Chip** (`ui:chip`)
11. **Chip Tabs** (`ui:chip-tabs`)
12. **Content Placeholder** (`ui:content-placeholder`)
13. **Contextual Floating Button** (`ui:contextual-floating-button`)
14. **Date Picker** (`ui:date-picker`)
15. **Dialog** (`ui:dialog`)
16. **Divider** (`ui:layout`)
17. **Field Button** (`ui:field-button`)
18. **Floating Action Button** (`ui:floating-action-button`)
19. **Help Bubble** (`ui:help-bubble`)
20. **Identity Placeholder** (`ui:identity-placeholder`)
21. **Image Frame** (`ui:layout`)
22. **List** (`ui:list`)
23. **List Header** (`ui:list-header`)
24. **Loading Indicator** (`ui:loading-indicator`)
25. **Menu** (`ui:menu`)
26. **Notification Badge** (`ui:notification-badge`)
27. **Page Banner** (`ui:page-banner`)
28. **Progress Circle** (`ui:progress-circle`)
29. **Quantity Picker** (`ui:quantity-picker`)
30. **Radio Group** (`ui:radio-group`)
31. **Reaction Button** (`ui:reaction-button`)
32. **Responsive Dialog** (`ui:responsive-dialog`)
33. **Responsive Side Panel** (`ui:responsive-side-panel`)
34. **Result Section** (`ui:result-section`)
35. **Segmented Control** (`ui:segmented-control`)
36. **Select** (`ui:select`)
37. **Select Box** (`ui:select-box`)
38. **Side Navigation** (`ui:side-navigation`)
39. **Side Panel** (`ui:side-panel`)
40. **Skeleton** (`ui:skeleton`)
41. **Slider** (`ui:slider`)
42. **Snackbar** (`ui:snackbar`)
43. **Swipeable Menu Sheet** (`ui:swipeable-menu-sheet`)
44. **Switch** (`ui:switch`)
45. **Tabs** (`ui:tabs`)
46. **Tag Group** (`ui:tag-group`)
47. **Text Field** (`ui:text-field`)
48. **Time Picker** (`ui:time-picker`)
49. **Top Navigation** (`ui:top-navigation`)
