---
name: ax-design
description: AX Design System 공식 가이드 및 Doctor 진단 스킬. AX Design System의 컴포넌트 스펙, 토큰, UI 스니펫, 코드 작성 규칙 및 Doctor 진단을 통합 안내합니다.
user-invocable: true
---

# AX Design System Guide & Doctor

AX Design System 프로젝트 (`axpublish-init/docs`) 전용 AI 통합 가이드 및 진단 스킬입니다.

## 1. 주요 경로
- **쇼케이스 메인 코드**: `docs/src/sections/ComponentGallery.jsx`
- **UI 스니펫 모듈**: `docs/src/components/ui/`
- **AI 인덱스**: `docs/public/llms.txt`

## 2. 핵심 디자인 및 코드 규칙
- **시맨틱 텍스트**: `<Text textStyle="t2Medium" color="fg.neutralSubtle">` 사용
- **컨트롤 라벨**: `<code style={{ fontSize: "0.85em", ... }}>prop</code>:` 사용
- **정식 토큰**: `var(--seed-color-palette-static-black)`, `var(--seed-color-bg-layer-basement)` 사용