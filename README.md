# axpublish-init

> AI Design-to-Code Pipeline — Figma MCP + Seed Design + Tailwind CSS

[![npm version](https://img.shields.io/npm/v/axpublish-init?color=0066FF&label=version)](https://www.npmjs.com/package/axpublish-init)
[![npm downloads](https://img.shields.io/npm/dm/axpublish-init)](https://www.npmjs.com/package/axpublish-init)
[![license](https://img.shields.io/npm/l/axpublish-init)](LICENSE)
[![node](https://img.shields.io/badge/node-%3E%3D16-brightgreen)](package.json)

디자이너의 Figma 파일을 AI가 읽고, 디자인 토큰을 바인딩하고, 반응형 웹 코드로 퍼블리싱하는 오픈 파이프라인입니다.

📖 **[Documentation](https://axpublish-init.github.io/axpublish-init)**

---

## Quick Start

```bash
npx axpublish-init
```

실행하면 순서대로 물어봅니다:

```
  프로젝트명 (영문, 폴더명으로 사용됩니다) : my-project
  Figma 파일 URL                          : https://figma.com/design/...
  Primary 컬러 (hex, 예: #0066FF)         : #0066FF
  Secondary 컬러 (없으면 Enter 건너뜀)    : (Enter)
  빌드할 화면 목록 (쉼표 구분)            : 홈, About, Contact
```

생성 결과:

```
my-project/
├── PROMPT.md                    ← Claude에 붙여넣을 시작 프롬프트 (자동 완성)
├── axpublish-orchestrator.md    ← AI 워크플로우 지침서
├── responsive-rules.md          ← 반응형 변환 규칙
├── tokens.css                   ← Seed Design 시맨틱 토큰
├── tailwind.config.js           ← Tailwind 클래스 매핑
├── generate-theme.js            ← 컬러 스케일 생성기
└── figma-semantic-variables.json ← Figma Variable 템플릿 (49개)
```

---

## 작동 방식

```
Raw Figma 파일
  ↓
AI + Figma MCP 연결
  ↓
[MCP WRITE]
  ├── Variable 49개 생성
  ├── 레이어 전체 바인딩
  ├── 인터랙션 상태 시각화 (hover / pressed / disabled)
  └── 컴포넌트 라이브러리 생성 (Button, GNB, Input, Modal…)
  ↓
[⚠ 충돌 검증] → 디자이너 수동 해결
  ↓
[🔒 Figma 확정 게이트] → 디자이너 OK 이후에만 Code Gen 시작
  ↓
[💻 Code Generation] → 화면별 순차 조립
  ↓
[🎉 완료] → UI / Interaction QA
```

---

## 6-Phase 워크플로우

| Phase | 이름 | 내용 |
|-------|------|------|
| 0 | Discovery & Figma 세팅 | 브랜드 컬러 → Variable 49개 → 레이어 바인딩 → 인터랙션 시각화 → 확정 게이트 |
| 1 | 타이포그래피 바인딩 | 텍스트 레이어 → Seed Design 16레벨 토큰 매핑 |
| 2 | 반응형 구조 분석 | Auto-layout → CSS Flex/Grid 변환 |
| 3 | 전역 컴포넌트 라이브러리 | Figma Component + Code 파일 동시 생성 |
| 4–5 | 화면별 조립 & 로컬 QA | 한 화면씩 완성 → 승인 → 다음 화면 |
| 6 | UI / Interaction QA | 전체 인터랙션 검수 |

---

## 절대 원칙

1. **순서 고수** — Phase 0 → 1 → 2 → 3 → 4 → 5 → 6
2. **선보고 후실행** — 각 Step 시작·완료 시 보고
3. **하드코딩 금지** — tokens.css / theme.css 변수만 사용
4. **임의 판단 금지** — PAUSE 상황에서 반드시 옵션 제시
5. **화면 단위 진행** — 전체 일괄 빌드 절대 금지
6. **Code Gen은 Figma 확정 이후에만** — Phase 0-F 통과 전 코드 생성 금지
7. **컴포넌트 재사용** — Phase 3에서 한 번 만들고 재사용

---

## Requirements

- Node.js >= 16
- Claude with Figma MCP connected

## License

MIT
